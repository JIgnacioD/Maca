<?php

namespace App\Models;

use App\Models\MerchandisingSubgoal;
use App\Models\MerchandisingUser;
use App\Models\SubGoal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchandising extends Model
{
    use HasFactory;

    protected $table = 'merchandisings';

    protected $fillable = [
        'name',
        'type',
        'stock',
        'description',
        'photo',
    ];

    public function subGoals()
    {
        return $this->belongsToMany(SubGoal::class, 'merchandising_subgoal','merchandising_id','subgoal_id')
                    ->withPivot(['id'])
                    ->withTimestamps();
    }
    public function usages()
    {
        return $this->hasManyThrough(
            MerchandisingUser::class,
            MerchandisingSubgoal::class,
            'merchandising_id', // Foreign key on merchandising_subgoal
            'merchandising_subgoal_id', // Foreign key on merchandising_user
            'id', // Local key on merchandisings
            'id' // Local key on merchandising_subgoal
        );
    }
}
