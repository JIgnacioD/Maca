<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MerchandisingSubgoal extends Model
{
    protected $table = 'merchandising_subgoal';
    protected $fillable = [
        'merchandising_id',
        'subgoal_id',
    ];

    public function merchandising()
    {
        return $this->belongsTo(Merchandising::class);
    }
    public function subGoal()
    {
        return $this->belongsTo(SubGoal::class);
    }
    public function usages()
    {
        return $this->hasMany(MerchandisingUser::class);
    }
}
