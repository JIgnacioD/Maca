<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubGoal extends Model
{
    use HasFactory;

    protected $table = 'subgoals';

    protected $fillable = [
        'goals_id',
        'description',
        'value'
    ];

    /**
     * Get the goal that owns this sub-goal.
     */
    public function goal()
    {
        return $this->belongsTo(Goal::class, 'goals_id');
    }
}
