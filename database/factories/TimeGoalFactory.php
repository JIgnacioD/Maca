<?php

namespace Database\Factories;

use App\Models\TimeGoal;
use App\Models\SubGoal;
use Illuminate\Database\Eloquent\Factories\Factory;

class TimeGoalFactory extends Factory
{
    protected $model = TimeGoal::class;

    public function definition(): array
    {
        return [
            'subgoals_id' => SubGoal::factory(),
            'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'active_days' => $this->faker->numberBetween(7, 30),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
