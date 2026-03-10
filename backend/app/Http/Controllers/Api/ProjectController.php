<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $projects = Project::query()
            ->withCount('tasks')
            ->latest()
            ->paginate(10);

        return ProjectResource::collection($projects);
    }

    public function store(StoreProjectRequest $request): ProjectResource
    {
        $project = Project::create($request->validated());

        $project->loadCount('tasks');

        return new ProjectResource($project);
    }
}
