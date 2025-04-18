<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PDVFactory extends Factory
{
    public function definition()
    {
        return [
            'nombre_pdv' => 'PDV ' . $this->faker->numberBetween(1, 100),
            'descripcion' => '',
            'direccion' => $this->faker->streetAddress,
            'tipo_via' => $this->faker->randomElement(['CL', 'AV', 'VI', 'PZ', 'CR']),
            'nombre_via' => $this->faker->streetName,
            'num_via' => $this->faker->randomNumber(2, true),
            'cp' => $this->faker->randomNumber(5, true),
            'localidad' => 'GRANADA',
            'provincia' => 'GRANADA',
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
