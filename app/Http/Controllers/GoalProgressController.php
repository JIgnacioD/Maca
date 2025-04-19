<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalProgressController extends Controller
{
    public function index()
    {
        $goals = Goal::with(['subGoals.timeGoals.userGoals' => function($query) {
            $query->where('user_id', Auth::id());
        }])->get()->map(function ($goal) {
            return [
                'id' => $goal->id,
                'name' => $goal->description,
                'subGoals' => $goal->subGoals->map(function ($subGoal) {
                    return [
                        'id' => $subGoal->id,
                        'name' => $subGoal->description,
                        'current' => $subGoal->timeGoals->sum('progress'),
                        'target' => $subGoal->value,
                        'timeGoals' => $subGoal->timeGoals->map(function ($timeGoal) {
                            return [
                                'id' => $timeGoal->id,
                                'start_date' => $timeGoal->start_date,
                                'active_days' => $timeGoal->active_days,
                                'progress' => $timeGoal->userGoals->first()->progress ?? 0
                            ];
                        })
                    ];
                })
            ];
        });

        return response()->json($goals);
    }
}
