<?php

namespace Database\Factories;

use App\Models\Merchandising;
use Illuminate\Database\Eloquent\Factories\Factory;

class MerchandisingFactory extends Factory
{
    protected $model = Merchandising::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true) . ' promocional',
            'type' => $this->faker->randomElement(['display', 'folleto', 'regalo', 'cartel']),
            'stock' => $this->faker->numberBetween(10, 100),
            'description' => $this->faker->sentence(10),
            'photo' => $this->faker->imageUrl(640, 480, 'business', true, 'Faker'),
        ];
    }
}
