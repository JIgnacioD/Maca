<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PDVFactory extends Factory
{
    public function definition()
    {
        return [
            'pdv_name' => 'PDV ' . $this->faker->numberBetween(1, 100),
            'description' => '',
            'address' => $this->faker->streetAddress,
            'street_type' => $this->faker->randomElement(['CL', 'AV', 'VI', 'PZ', 'CR']),
            'street_name' => $this->faker->streetName,
            'street_num' => $this->faker->randomNumber(2, true),
            'cp' => $this->faker->randomNumber(5, true),
            'city' => 'GRANADA',
            'province' => 'GRANADA',
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
