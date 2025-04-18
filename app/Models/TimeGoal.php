<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeGoal extends Model
{
    use HasFactory;

    protected $table = 'timegoals';

    protected $fillable = [
        'subgoals_id',
        'start_date',
        'active_days'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'active_days' => 'integer'
    ];

    /**
     * Get the subgoal that owns this time goal
     */
    public function subGoal()
    {
        return $this->belongsTo(SubGoal::class, 'subgoals_id');
    }

    /**
     * Get the user goals for this time goal
     */
    public function userGoals()
    {
        return $this->hasMany(UserGoal::class, 'timegoals_id');
    }
}
