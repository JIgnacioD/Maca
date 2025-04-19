<?php

namespace Database\Seeders;

use App\Models\SubGoal;
use App\Models\Merchandising;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MerchandisingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea 5 materiales de merchandising
        $merchandisings = Merchandising::factory()->count(5)->create();

        // Asocia cada merchandising a 1-3 subobjetivos aleatorios
        $subgoals = SubGoal::all();
        foreach ($merchandisings as $merch) {
            $randomSubgoals = $subgoals->random(rand(1, min(3, $subgoals->count())));
            $merch->subGoals()->attach($randomSubgoals->pluck('id')->toArray());
        }
    }
}
