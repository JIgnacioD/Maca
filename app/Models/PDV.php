<?php

namespace App\Models;

use App\Models\Contact;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PDV extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * Specify the table name to match the database table.
     */
    protected $table = 'pdvs';

    protected $fillable = [
        'pdv_name',
        'description',
        'address',
        'street_type',
        'street_name',
        'street_num',
        'cp',
        'city',
        'province',
        'lat',
        'lng'
    ];

    // Relación muchos a muchos con Contactos
    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_pdv');
    }

    /**
     * Define the relationship with the Visit model (one-to-many).
     */
    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
    public function assignedUsers()
    {
        return $this->belongsToMany(User::class, 'user_pdv', 'pdv_id', 'user_id');
    }

}
