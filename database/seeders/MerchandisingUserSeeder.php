<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MerchandisingUser;
use App\Models\Merchandising;
use App\Models\User;
use App\Models\SubGoal;

class MerchandisingUserSeeder extends Seeder
{
    public function run(): void
    {
        $merchSubgoals = \App\Models\MerchandisingSubgoal::all();
        $users = \App\Models\User::all();

        foreach ($merchSubgoals as $ms) {
            foreach ($users->random(rand(1, 2)) as $user) {
                \App\Models\MerchandisingUser::factory()->create([
                    'merchandising_subgoal_id' => $ms->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
