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

    public function test_it_creates_a_task_for_a_project(): void
    {
        $project = Project::factory()->create();

        $payload = [
            'title' => 'Implement authentication',
            'description' => 'Add API authentication flow',
            'status' => 'todo',
            'priority' => 'high',
            'due_date' => now()->addDays(5)->toDateString(),
        ];

        $response = $this->postJson("/api/projects/{$project->id}/tasks", $payload);

        $response
            ->assertCreated()
            ->assertJsonPath('data.project_id', $project->id)
            ->assertJsonPath('data.title', 'Implement authentication')
            ->assertJsonPath('data.status', 'todo')
            ->assertJsonPath('data.priority', 'high');

        $this->assertDatabaseHas('tasks', [
            'project_id' => $project->id,
            'title' => 'Implement authentication',
            'status' => 'todo',
            'priority' => 'high',
        ]);
    }

    public function test_it_filters_tasks_by_status_and_priority(): void
    {
        $project = Project::factory()->create();

        Task::factory()->create([
            'project_id' => $project->id,
            'title' => 'High priority todo task',
            'status' => 'todo',
            'priority' => 'high',
        ]);

        Task::factory()->create([
            'project_id' => $project->id,
            'title' => 'Medium priority done task',
            'status' => 'done',
            'priority' => 'medium',
        ]);

        $response = $this->getJson("/api/projects/{$project->id}/tasks?status=todo&priority=high");

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'High priority todo task')
            ->assertJsonPath('data.0.status', 'todo')
            ->assertJsonPath('data.0.priority', 'high');
    }
}