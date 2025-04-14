<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PDVFactory extends Factory
{
    public function definition()
    {
        return [
            'nombre_pdv' => 'PDV ' . $this->faker->numberBetween(1, 100),
            'descripcion' => $this->faker->sentence,
            'direccion' => $this->faker->streetAddress,
            'cp' => $this->faker->postcode,
            'localidad' => $this->faker->city,
            'provincia' => $this->faker->state,
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
