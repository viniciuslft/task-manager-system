<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // --- Este método está causando um bug ao gerar o seeder: Projetos com task_count zerados ---
        // Project::factory()
        //     ->count(5)
        //     ->create()
        //     ->each(function ($project) {
        //         $project->tasks()->createMany(
        //             Task::factory()
        //                 ->count(rand(3, 8))
        //                 ->make()
        //                 ->toArray()
        //         );
        //     });

        $projects = Project::factory()->count(5)->create();
        foreach ($projects as $project) {
            $project->tasks()->createMany(
                Task::factory()
                    ->count(rand(3, 8))
                    ->make()
                    ->toArray()
            );
        }
    }
}
