<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evento;

class EventosController extends Controller
{
    public function index()
    {
        // Traemos todos los eventos con el conteo de participantes
        $eventos = Evento::withCount('participantes')->get();

        // Transformamos los eventos para devolver fecha formateada y plazas libres
        $eventosFormateados = $eventos->map(function ($evento) {
            $max = $evento->max_participantes ?? 0;
            $ocupados = $evento->participantes_count;
            $plazas_libres = max(0, $max - $ocupados);

            return [
                'id' => $evento->id,
                'nombre' => $evento->nombre,
                'descripcion' => $evento->descripcion,
                'fecha' => $evento->fecha->format('Y-m-d'), // 👈 así sí funciona
                'ubicacion' => $evento->ubicacion,
                'created_at' => $evento->created_at,
                'updated_at' => $evento->updated_at,
                'max_participantes' => $evento->max_participantes,
                'participantes_count' => $evento->participantes_count,
                'plazas_libres' => $plazas_libres,
            ];
        });

        return response()->json($eventosFormateados);
    }



    public function store(Request $req)
    {
        $validated = $req->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha' => 'required|date',
            'ubicacion' => 'nullable|string|max:255',
            'max_participantes' => 'nullable|integer|min:1',
        ]);

        $evento = new Evento();
        $evento->nombre = $validated['nombre'];
        $evento->descripcion = $validated['descripcion'] ?? null;
        $evento->fecha = $validated['fecha'];
        $evento->ubicacion = $validated['ubicacion'] ?? null;
        $evento->max_participantes = $validated['max_participantes'] ?? 1;

        $evento->save();

        return response()->json(['mensaje' => 'Evento creado correctamente', 'evento' => $evento], 201);
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
            'ubicacion' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'max_participantes' => 'nullable|integer|min:1',
        ]);

        $evento = Evento::find($id);
        if (!$evento) {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }

        $evento->nombre = $validated['nombre'];
        $evento->fecha = $validated['fecha'];
        $evento->ubicacion = $validated['ubicacion'] ?? '';
        $evento->descripcion = $validated['descripcion'] ?? '';
        $evento->max_participantes = $validated['max_participantes'] ?? null;

        $evento->save();

        return response()->json(['success' => true, 'mensaje' => 'Evento actualizado correctamente', 'evento' => $evento]);
    }


    public function destroy($id)
    {
        $evento = Evento::find($id);
        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $evento->delete();

        return response()->json(['message' => 'Evento eliminado correctamente']);
    }
}
