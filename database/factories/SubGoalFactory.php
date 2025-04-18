<?php

namespace Database\Factories;

use App\Models\SubGoal;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubGoalFactory extends Factory
{
    protected $model = SubGoal::class;

    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence(4),
            'value' => $this->faker->numberBetween(1000, 10000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
