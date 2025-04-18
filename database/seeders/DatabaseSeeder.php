<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Seed the default user
        User::factory()->create([
            'name' => 'Nacho',
            'email' => 'jignaciodvlpr@gmail.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => bcrypt('password'),
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Run the other seeders for PDVs, Contacts, Visits, and ContactPDV
        $this->call([
            // UserSeeder::class,
            PDVSeeder::class,
            ContactSeeder::class,
            UserPdvSeeder::class,
            ContactPDVSeeder::class,
            VisitSeeder::class,
            GoalsSeeder::class,

        ]);

    }
}
