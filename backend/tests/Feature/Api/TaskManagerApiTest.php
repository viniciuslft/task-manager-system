<?php

namespace Tests\Feature\Api;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskManagerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_project(): void
    {
        $payload = [
            'name' => 'Project Alpha',
            'description' => 'Initial technical test project',
            'status' => 'active',
        ];

        $response = $this->postJson('/api/projects', $payload);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'Project Alpha')
            ->assertJsonPath('data.status', 'active');

        $this->assertDatabaseHas('projects', [
            'name' => 'Project Alpha',
            'status' => 'active',
        ]);
    }
}