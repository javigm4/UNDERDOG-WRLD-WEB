<?php

namespace App\Http\Controllers;

use App\Models\Participante;
use Illuminate\Http\Request;

class ParticipantesController extends Controller
{
    public function index()
    {
        $participante = Participante::all();
        return $participante;
    }

    public function eliminarParticipante($id)
    {
        $participante = Participante::find($id);

        if (!$participante) {
            return response()->json(['mensaje' => 'Participante no encontrado'], 404);
        }
        $participante->delete();
        return response()->json(['mensaje' => 'Participante eliminado correctamente']);
    }


    //crear un nuevo participante con lo enviado en el formulario de las solicitudes
    public function añadirParticipante(Request $request)
    {
        $participante = new Participante();
        $participante->id_usuario = $request->id_usuario;
        $participante->id_evento = $request->id_evento;
        $participante->email =$request->email;
        $participante->save();
        return response()->json(['mensaje' => 'Participante añadido correctamente']);
    }
}
