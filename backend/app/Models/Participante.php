<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participante extends Model
{
    use HasFactory;

    protected $table = 'participantes';

    protected $fillable = [
        'email',
        'id_usuario',
        'id_evento',
    ];

    // Relación hacia Evento
    public function evento()
    {
        return $this->belongsTo(Evento::class, 'id_evento');
    }
    public $timestamps = false;



    public static function crearParticipante($id_usuario, $id_evento, $email)
    {
        $participante = new self(); // o new Participante();
        $participante->id_usuario = $id_usuario;
        $participante->id_evento = $id_evento;
        $participante->email = $email;
        $participante->save();

        return $participante;
    }
}
