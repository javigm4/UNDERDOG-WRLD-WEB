<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class YouTubeController extends Controller
{
    public function searchVideos(Request $request)
    {
        $channelId = env('CHANNEL_ID');
        $cacheKey = 'youtube_search_' . md5($channelId);

        $results = Cache::remember($cacheKey, 7200, function () use ($channelId) {
            $apiKey = env('YOUTUBE_API_KEY');
            $response = Http::withOptions([
                'verify' => base_path('certs/cacert.pem'),
            ])->get('https://www.googleapis.com/youtube/v3/search', [
                'part' => 'snippet',
                'channelId' => $channelId,
                'type' => 'video',
                'maxResults' => 10,
                'key' => $apiKey,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        if (!$results) {
            return response()->json(['error' => 'Error fetching videos'], 500);
        }

        return response()->json($results);
    }
}
