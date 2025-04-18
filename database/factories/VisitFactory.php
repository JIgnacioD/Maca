<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\PDV;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class VisitFactory extends Factory
{
    public function definition()
    {
        $startTime = Carbon::now()->subDays($this->faker->numberBetween(1, 30));

        return [
            'pdv_id' => PDV::all()->random()->id,
            'user_id' => User::all()->random()->id,
            'contact_id' => Contact::all()->random()->id,
            'start_time' => $startTime,
            'end_time' => $startTime->addHours($this->faker->numberBetween(1, 5)),
            'start_lat' => $this->faker->latitude,
            'start_lng' => $this->faker->longitude,
            'end_lat' => $this->faker->latitude,
            'end_lng' => $this->faker->longitude,
        ];
    }
}
