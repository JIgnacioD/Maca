<?php

namespace Database\Factories;

use App\Models\UserGoal;
use App\Models\TimeGoal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserGoalFactory extends Factory
{
    protected $model = UserGoal::class;

    public function definition(): array
    {
        return [
            'timegoals_id' => TimeGoal::factory(),
            'user_id' => User::factory(),
            'progress' => $this->faker->randomFloat(2, 0, 100),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed', 'failed']),
            'completed_at' => $this->faker->optional(0.3)->dateTimeBetween('now', '+2 months'),
            'notes' => $this->faker->optional()->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
