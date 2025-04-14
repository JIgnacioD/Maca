<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Visit;
use App\Models\PDV;
use Carbon\Carbon;

class VisitSeeder extends Seeder
{
    public function run()
    {
        Visit::factory()->count(100)->create();

    }
}
