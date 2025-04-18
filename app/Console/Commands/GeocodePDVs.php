<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PDV;
use Illuminate\Support\Facades\Http;

class GeocodePDVs extends Command
{
    protected $signature = 'geocode:pdvs';
    protected $description = 'Obtiene coordenadas geográficas para los PDVs';

    public function handle()
    {
        $pdvs = PDV::all();

        foreach ($pdvs as $pdv) {
            $dir = $pdv->nombre_pdv.", ".$pdv->num_via.", ".$pdv->tipo_via." ".$pdv->nombre_via.", ".$pdv->localidad.", ".$pdv->cp;
            $this->info("{$dir}");

            $address = urlencode($dir);
            $apiKey = config('services.locationiq.key');
            $url = "https://us1.locationiq.com/v1/search.php?key={$apiKey}&q={$address}&format=json";

            $this->info("Procesando PDV: {$url}");
            $response = Http::get($url);

            if ($response->successful()) {
                $data = $response->json()[0];
                $pdv->descripcion = $data['display_name'];
                $pdv->lat = $data['lat'];
                $pdv->lng = $data['lon'];
                $pdv->save();

                $this->info("Coordenadas obtenidas para: {$data['display_name']}");
            } else {
                $this->error("Error al obtener coordenadas para: {$data['display_name']}");
            }

            $this->info("");
            sleep(1); // Para respetar las políticas de uso de la API
        }
    }
}
