<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserGoal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'usergoals';

    protected $fillable = [
        'timegoals_id',
        'user_id',
        'progress',
        'status',
        'completed_at',
        'notes'
    ];

    protected $casts = [
        'progress' => 'float',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Get the time goal that owns this user goal
     */
    public function timeGoal()
    {
        return $this->belongsTo(TimeGoal::class, 'timegoals_id');
    }

    /**
     * Get the user that owns this goal
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include goals for a specific user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
