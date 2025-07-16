import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
//AIzaSyD42W6AX5nUW3tUGK5M6M_JcepJ07coXBM
  private apiKey: string = ''; // ← Aquí pondrás tu API Key
  private channelId: string = 'UCi-CFi2X7xketmBh5Gb2vrg'; // ← Aquí pondrás el ID del canal
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  // Método para obtener los últimos videos subidos al canal
  getVideos(): Observable<any> {
      console.log('Llamada a getVideos()');

    const url = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet,id&order=date&maxResults=10`;
    return this.http.get(url);
  }
}
