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

    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|exists:users,id',
            'id_evento' => 'required|exists:eventos,id',
            'estado' => 'in:pendiente,aceptado,rechazado',
            'enlace_tiktok' => 'required',
        ]);

        $solicitud = Solicitud::create([
            'id_usuario' => $request->id_usuario,
            'id_evento' => $request->id_evento,
            'estado' => 'pendiente',
            'enlace_tiktok' => $request->enlace_tiktok,
        ]);

        return response()->json([
            'mensaje' => 'Solicitud creada exitosamente',
            'solicitud' => $solicitud
        ], 201);
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


    public function getByEventoId($id)
    {
        $solicitudes = Solicitud::where('id_evento', $id)->get();

        return response()->json($solicitudes);
    }
}
