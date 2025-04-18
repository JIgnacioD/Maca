<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Pdv;

class ProcesarDireccionesPdvs extends Command
{
    protected $signature = 'pdvs:procesar-direcciones';
    protected $description = 'Procesa las direcciones de los PDVs y actualiza tipo_via, nombre_via y num_via';

    public function handle()
    {
        $pdvs = Pdv::all();
        $this->info("Procesando " . $pdvs->count() . " registros...");

        foreach ($pdvs as $pdv) {
            $direccion = trim($pdv->direccion);
            if (empty($direccion)) {
                $this->warn("PDV ID {$pdv->id} tiene una dirección vacía. Saltando.");
                continue;
            }

            // Extraer las dos primeras letras para tipo_via
            $tipo_via = strtoupper(substr($direccion, 0, 2));
            switch ($tipo_via) {
                case 'CL':
                    $tipo_via_completo = 'CALLE';
                    break;
                case 'AV':
                    $tipo_via_completo = 'AVENIDA';
                    break;
                case 'CA':
                    $tipo_via_completo = 'CARRETERA';
                    break;
                case 'PL':
                    $tipo_via_completo = 'PLAZA';
                    break;
                default:
                    $tipo_via_completo = $tipo_via; // Mantener el valor original si no coincide
                    break;
            }

            // Dividir la dirección en partes
            $partes = explode(' ', $direccion);

            // Obtener num_via (última parte)
            $num_via = array_pop($partes);

            // Obtener nombre_via (lo que queda después de quitar tipo_via)
            $nombre_via = implode(' ', array_slice($partes, 1));

            // Actualizar el PDV
            $pdv->tipo_via = $tipo_via_completo;
            $pdv->nombre_via = $nombre_via;
            $pdv->num_via = $num_via;
            $pdv->save();

            $this->line("PDV ID {$pdv->id} procesado: tipo_via={$tipo_via_completo}, nombre_via={$nombre_via}, num_via={$num_via}");
        }

        $this->info("Procesamiento completado.");
    }
}
