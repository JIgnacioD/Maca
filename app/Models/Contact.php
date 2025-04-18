<?php

namespace App\Models;

use App\Models\PDV;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * Specify the table name to match the database table.
     */
    protected $table = 'contacts';

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'role'
    ];

    // Relación muchos a muchos con PDV
    public function pdvs()
    {
        return $this->belongsToMany(PDV::class, 'contact_pdv', 'contact_id', 'pdv_id');
    }

}
