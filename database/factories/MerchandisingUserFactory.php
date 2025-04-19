<?php

namespace Database\Factories;

use App\Models\MerchandisingUser;
use App\Models\Merchandising;
use App\Models\User;
use App\Models\SubGoal;
use Illuminate\Database\Eloquent\Factories\Factory;

class MerchandisingUserFactory extends Factory
{
    protected $model = MerchandisingUser::class;

    public function definition(): array
    {
        return [
            'merchandising_subgoal_id' => \App\Models\MerchandisingSubgoal::inRandomOrder()->first()?->id ?? \App\Models\MerchandisingSubgoal::factory(),
            'user_id' => \App\Models\User::inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
            'stock_load' => $this->faker->numberBetween(1, 10),
            'stock_used' => $this->faker->numberBetween(0, 10),
            'load_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
