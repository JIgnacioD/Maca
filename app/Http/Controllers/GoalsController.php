<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalsController extends Controller
{
    public function index()
    {
        $goals = Goal::with('subGoals')->get()->map(function ($goal) {
            return [
                'id' => $goal->id,
                'name' => $goal->description,
                'subGoals' => $goal->subGoals->map(function ($subGoal) {
                    return [
                        'id' => $subGoal->id,
                        'name' => $subGoal->description,
                        'current' => 0, // Implementar lógica de progreso
                        'target' => $subGoal->value
                    ];
                })
            ];
        });

        return response()->json($goals);
    }
}
