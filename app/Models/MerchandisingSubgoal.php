<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MerchandisingSubgoal extends Pivot
{
    protected $table = 'merchandising_subgoal';

    protected $fillable = [
        'merchandising_id',
        'subgoal_id',
    ];
    public function usages()
    {
        return $this->hasMany(MerchandisingUser::class, 'merchandising_subgoal_id');
    }
}
