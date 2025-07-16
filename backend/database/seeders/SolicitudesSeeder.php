<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SolicitudesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('solicitudes')->insert([
            [
                'id_usuario' => 1,
                'id_evento' => 1,
                'estado' => 'pendiente',
            ],
            [
                'id_usuario' => 2,
                'id_evento' => 1,
                'estado' => 'aceptado',
            ],
            [
                'id_usuario' => 3,
                'id_evento' => 2,
                'estado' => 'rechazado',
            ],
            [
                'id_usuario' => 4,
                'id_evento' => 2,
                'estado' => 'pendiente',
            ],
        ]);
    }
}
