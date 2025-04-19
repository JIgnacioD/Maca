<?php

namespace Database\Seeders;

use App\Models\Merchandising;
use App\Models\MerchandisingSubgoal;
use App\Models\MerchandisingUser;
use App\Models\SubGoal;
use App\Models\User;
use Illuminate\Database\Seeder;

class MerchandisingUserSeeder extends Seeder
{
    public function run(): void
    {
        $merchSubgoals = MerchandisingSubgoal::all();
        $users = User::all();

        foreach ($merchSubgoals as $ms) {
            foreach ($users->random(rand(1, 2)) as $user) {
                MerchandisingUser::factory()->create([
                    'merchandising_subgoal_id' => $ms->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
