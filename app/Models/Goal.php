<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $table = 'goals';

    protected $fillable = [
        'description'
    ];

    /**
     * Get the sub-goals for this goal.
     */
    public function subGoals()
    {
        return $this->hasMany(SubGoal::class, 'goals_id');
    }
}
