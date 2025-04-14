<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PDV;

class PDVSeeder extends Seeder
{
    public function run()
    {
        PDV::factory()->count(100)->create();

    }
}
