<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\PDV;

class ContactPDVSeeder extends Seeder
{
    public function run()
    {
        $pdv1 = PDV::find(1);
        $pdv2 = PDV::find(2);

        $contact1 = Contact::find(1);
        $contact2 = Contact::find(2);

        // Assigning contacts to multiple PDVs
        $contact1->pdvs()->attach([$pdv1->id, $pdv2->id]); // Juan is linked to PDV 1 & 2
        $contact2->pdvs()->attach([$pdv1->id]); // Ana is only linked to PDV 1
    }
}
