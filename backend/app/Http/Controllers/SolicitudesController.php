<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\Participante;
use Illuminate\Http\Request;
use App\Models\User;

class SolicitudesController extends Controller
{
    public function index()
    {
        $solicitudes = Solicitud::all();
        return $solicitudes;
    }

    public function aceptarSolicitud($id)
    {
        $solicitud = Solicitud::find($id);
        if (!$solicitud) {
            return response()->json(['mensaje' => 'Solicitud no encontrada'], 404);
        }

        if ($solicitud->estado !== 'pendiente') {
            return response()->json(['mensaje' => 'La solicitud ya fue procesada'], 400);
        }

        $solicitud->estado = 'aceptado';
        $solicitud->save();

        $usuario = User::find($solicitud->id_usuario);
        if (!$usuario) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }

        $participante = Participante::crearParticipante($solicitud->id_usuario, $solicitud->id_evento, $usuario->email);
        return response()->json([
            'mensaje' => 'Solicitud aceptada y participante añadido',
            'participante' => $participante
        ]);
    }

    public function rechazarSolicitud($id)
    {
        $solicitud = Solicitud::find($id);
        if (!$solicitud) {
            return response()->json(['mensaje' => 'Solicitud no encontrada'], 404);
        }

        $solicitud->estado = 'rechazado';
        $solicitud->save();
        return response()->json(['mensaje' => 'Solicitud rechazada exitosamente']);
    }
}
