<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Pdv;
use Illuminate\Support\Facades\DB;

class AssignPdvsToUser extends Command
{
    protected $signature = 'pdvs:assign-to-user';
    protected $description = 'Asigna todos los PDVs con CP que empieza por 18 al usuario con ID 1';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Seleccionar todos los PDVs cuyo CP comienza con "18"
        $pdvs = Pdv::where('cp', 'like', '18%')->get();

        if ($pdvs->isEmpty()) {
            $this->info('No se encontraron PDVs con CP que empiece por 18.');
            return 0;
        }

        $this->info('Asignando PDVs al usuario con ID 1...');

        foreach ($pdvs as $pdv) {
            // Insertar en la tabla user_pdv
            DB::table('user_pdv')->updateOrInsert(
                [
                    'user_id' => 1,
                    'pdv_id' => $pdv->id,
                ],
                [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            $this->info("PDV {$pdv->id} asignado al usuario 1.");
        }

        $this->info('Asignación completada.');
        return 0;
    }
}
