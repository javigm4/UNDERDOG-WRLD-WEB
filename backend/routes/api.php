<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventosController;
use App\Http\Controllers\ParticipantesController;
use App\Http\Controllers\SolicitudesController;
use App\Http\Controllers\YouTubeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



//rutas publicas sin autenticacion
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);

//rutas de informacion
Route::get('/eventos', [EventosController::class, 'index']);
Route::get('/solicitudes', [SolicitudesController::class, 'index']);
Route::get('/usuarios', [AuthController::class, 'index']);
Route::get('/participantes', [ParticipantesController::class, 'index']);


//verificar contraseña para los administradores de la web
Route::post('/verificar-clave-admin', [AuthController::class, 'verificar']);

//rutas de CURL
Route::delete('/eliminar-participante/{id}', [ParticipantesController::class, 'eliminarParticipante']);
Route::post('/añadir-participante', [ParticipantesController::class, 'añadirParticipante']);
Route::post('/crearEvento', [EventosController::class, 'store']);
Route::put('/eventos/{id}', [EventosController::class, 'update']);
Route::delete('/eventos/{id}', [EventosController::class, 'destroy']);
Route::post('/crear-solicitud', [SolicitudesController::class, 'store']);

//aceptar denegar
Route::post('/aceptar-solicitud/{id}', [SolicitudesController::class, 'aceptarSolicitud']);
Route::post('/rechazar-solicitud/{id}', [SolicitudesController::class, 'rechazarSolicitud']);


//obtener eventos por id
Route::get('/solicitudes/evento/{id}', [SolicitudesController::class, 'getByEventoId']);

// videos yt
Route::get('/youtube/search', [YouTubeController::class, 'searchVideos']);
