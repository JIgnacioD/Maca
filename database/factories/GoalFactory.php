<?php

namespace Database\Factories;

use App\Models\Goal;
use Illuminate\Database\Eloquent\Factories\Factory;

class GoalFactory extends Factory
{
    protected $model = Goal::class;

    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence(3),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
