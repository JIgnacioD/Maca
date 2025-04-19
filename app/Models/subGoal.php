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
        'name',
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
    public function timeGoals()
    {
        return $this->hasMany(TimeGoal::class, 'subgoals_id');
    }
    public function merchandisingSubgoal()
    {
        return $this->belongsToMany(Merchandising::class, 'merchandising_subgoal', 'subgoal_id', 'merchandising_id')
                    ->withPivot(['id'])
                    ->withTimestamps();
    }
}
