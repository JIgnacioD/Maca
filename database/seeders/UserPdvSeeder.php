<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PDV;

class UserPdvSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $pdvs = PDV::all();

        foreach ($users as $user) {
            $user->assignedPdvs()->attach($pdvs->random(20)->pluck('id')); // Asigna 3 PDVs aleatorios a cada usuario
        }
    }
}
