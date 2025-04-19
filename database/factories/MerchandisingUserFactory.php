<?php

namespace Database\Factories;

use App\Models\Merchandising;
use App\Models\MerchandisingSubgoal;
use App\Models\MerchandisingUser;
use App\Models\SubGoal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MerchandisingUserFactory extends Factory
{
    protected $model = MerchandisingUser::class;

    public function definition(): array
    {
        return [
            'merchandising_subgoal_id' => MerchandisingSubgoal::inRandomOrder()->first()?->id ?? MerchandisingSubgoal::factory(),
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'stock_load' => $this->faker->numberBetween(1, 10),
            'stock_used' => $this->faker->numberBetween(0, 10),
            'load_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
