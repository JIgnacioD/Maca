<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerchandisingUser extends Model
{
    use HasFactory;

    protected $table = 'merchandising_user';

    protected $fillable = [
        'merchandising_subgoal_id',
        'user_id',
        'stock_load',
        'stock_used',
        'load_at'
    ];

    public function merchandisingSubgoal()
    {
        return $this->belongsTo(MerchandisingSubgoal::class, 'merchandising_subgoal_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
