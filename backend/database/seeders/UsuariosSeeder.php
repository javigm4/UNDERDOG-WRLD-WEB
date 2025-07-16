<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Juan Perez',
                'email' => 'juanperez@underdog.com',
                'password' => bcrypt('password123'),
            ],
            [
                'nombre' => 'Maria Lopez',
                'email' => 'marialopez@underdog.com',
                'password' => bcrypt('password123'),
            ],[
                'nombre' => 'Pedro Lopez',
                'email' => 'eeeeee@underdog.com',
                'password' => bcrypt('password123'),
            ],[
                'nombre' => 'Nose Lopez',
                'email' => 'nose@underdog.com',
                'password' => bcrypt('password123'),
            ],
        ]);
    }
}
