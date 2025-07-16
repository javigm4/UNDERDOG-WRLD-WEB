<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use     Illuminate\Support\Facades\DB;
class EventosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         DB::table('eventos')->insert([
            [
                'nombre' => 'UnderDog WRLD Plazita',
                'descripcion' => 'Competición urbana',
                'fecha' => '2025-08-10',
                'ubicacion' => 'Algeciras, Magallanes',
            ],
            [
                'nombre' => 'Batalla de breakdance',
                'descripcion' => 'Competicion de breakdance en la plaza central, [...]',
                'fecha' => '2025-09-01',
                'ubicacion' => 'Malaga, Plaza de la Marina',
            ]
        ]);
    }
}
