<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Solicitud;
use App\Models\Participante;

class Evento extends Model
{
    use HasFactory;

    protected $table = 'eventos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'fecha',
        'ubicacion',
        'max_participantes',
    ];

    protected $casts = [
        'fecha' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relaciones
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'id_evento');
    }

    public function participantes()
    {
        return $this->hasMany(Participante::class, 'id_evento');
    }
}
