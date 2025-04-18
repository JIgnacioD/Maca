<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'active_tasks';

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'start_lat',
        'start_lng',
        // Add other fields as needed
    ];
}
