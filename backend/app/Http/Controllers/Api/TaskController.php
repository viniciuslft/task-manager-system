<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function index(Request $request, Project $project): AnonymousResourceCollection
    {
        $tasks = $project->tasks()
            ->when(
                $request->filled('status'),
                fn ($query) => $query->where('status', $request->string('status'))
            )
            ->when(
                $request->filled('priority'),
                fn ($query) => $query->where('priority', $request->string('priority'))
            )
            ->latest()
            ->paginate(10);

        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request, Project $project): TaskResource
    {
        $task = $project->tasks()->create($request->validated());

        return new TaskResource($task);
    }
}
