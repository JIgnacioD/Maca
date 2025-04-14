<?php

namespace App\Models;

use App\Models\PDV;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    /**
     * Specify the table name to match the database table.
     */
    protected $table = 'visits';

    protected $fillable = [
        'pdv_id', 'user_id', 'start_time', 'end_time', 'start_lat', 'start_lng', 'end_lat', 'end_lng'
    ];

    // Relationship with PDV (a visit belongs to a PDV)
    public function pdv()
    {
        return $this->belongsTo(PDV::class);
    }
}
