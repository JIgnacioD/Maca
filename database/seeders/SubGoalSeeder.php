<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Goal;
use App\Models\SubGoal;

class SubGoalSeeder extends Seeder
{
    public function run(): void
    {
        $goals = Goal::all();

        foreach ($goals as $goal) {
            // Crea entre 2 y 4 subobjetivos por cada objetivo
            SubGoal::factory()
                ->count(rand(2, 4))
                ->create([
                    'goals_id' => $goal->id,
                ]);
        }
    }
}
