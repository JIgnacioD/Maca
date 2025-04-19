<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Pdv;
use Illuminate\Support\Facades\Http;

class UpdatePdvCoordinates extends Command
{
    protected $signature = 'pdvs:update-coordinates';
    protected $description = 'Actualiza las coordenadas (lat, lng) de los PDVs basándose en sus direcciones';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // API de geocodificación (puedes usar Google Maps o OpenStreetMap)
        $geocodingApiUrl = 'https://nominatim.openstreetmap.org/search';

        // Obtener todos los PDVs sin coordenadas
        $pdvs = Pdv::all();

        if ($pdvs->isEmpty()) {
            $this->info('No hay PDVs pendientes de actualizar.');
            return 0;
        }

        foreach ($pdvs as $pdv) {
            $dir = $pdv->street_name . ', ' . $pdv->cp . ', ' . $pdv->province;
            $this->info("Procesando: {$dir}");

            // Llamada a la API de geocodificación
            // $response = Http::get($geocodingApiUrl, [
            //     'q' => $dir,
            //     'format' => 'json',
            //     'limit' => 1,
            // ]);

            // $this->info("Respuesta de la API para {$dir}: " . $response->body());
            $dir = urlencode($dir);
            $apiKey = config('services.locationiq.key');
            $url = "https://us1.locationiq.com/v1/search.php?key={$apiKey}&q={$dir}&format=json";

            $this->info("Procesando PDV: {$url}");
            $response = Http::get($url);

            //$this->info("Respuesta de la API para {$dir}: " . $response->body());

            if ($response->successful() && !empty($response[0])) {
                $coordinates = $response[0];
                $pdv->lat = $coordinates['lat'];
                $pdv->lng = $coordinates['lon'];
                $pdv->save();

                $this->info("Coordenadas actualizadas: {$pdv->lat}, {$pdv->lng}");
            } else {
                $this->error("No se pudieron obtener coordenadas para: {$dir}");
            }
        }

        $this->info('Actualización de coordenadas completada.');
        sleep(1); // Respetar las políticas de uso de la API
        return 0;
    }
}
