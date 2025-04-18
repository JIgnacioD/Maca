<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Goal;
use App\Models\SubGoal;
use App\Models\TimeGoal;
use App\Models\UserGoal;
use App\Models\User;

class GoalsSeeder extends Seeder
{
    public function run(): void
    {
        // Crear algunos usuarios si no existen
        $users = User::factory()->count(3)->create();

        // Crear objetivos principales
        Goal::factory()
            ->count(3)
            ->create()
            ->each(function ($goal) use ($users) {
                // Crear subobjetivos para cada objetivo
                SubGoal::factory()
                    ->count(rand(2, 4))
                    ->create(['goals_id' => $goal->id])
                    ->each(function ($subGoal) use ($users) {
                        // Crear timegoals para cada subobjetivo
                        TimeGoal::factory()
                            ->count(rand(1, 2))
                            ->create(['subgoals_id' => $subGoal->id])
                            ->each(function ($timeGoal) use ($users) {
                                // Asignar timegoals a usuarios aleatorios
                                $users->random(rand(1, 3))->each(function ($user) use ($timeGoal) {
                                    UserGoal::factory()->create([
                                        'timegoals_id' => $timeGoal->id,
                                        'user_id' => $user->id
                                    ]);
                                });
                            });
                    });
            });
    }
}
