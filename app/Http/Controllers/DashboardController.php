<?php

namespace App\Http\Controllers;

use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getUsers(Request $request)
    {
        $users = User::all(); // Obtener todos los usuarios
        return response()->json($users); // Devolver usuarios en formato JSON
    }

    public function getAssignedPdvs(Request $request)
    {
        $user = $request->user(); // Usuario autenticado

        if (!$user) {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        // Obtener puntos de venta mediante la relación
        $assignedPdvs = $user->assignedPdvs; // Usa la relación belongsToMany en el modelo User

        if ($assignedPdvs->isEmpty()) {
            return response()->json(['message' => 'No hay puntos de venta asignados'], 404);
        }

        return response()->json($assignedPdvs); // Devolver en JSON

    }

    public function updatePdvsCoordinates()
    {
        $pdvs = \App\Models\Pdv::all(); // Obtener todos los PDVs desde la base de datos

        foreach ($pdvs as $pdv) {
            $address = urlencode($pdv->direccion); // Codificar la dirección para usarla en la URL
            $url = "https://nominatim.openstreetmap.org/search?q=$address&format=json&addressdetails=1";

            // Llamar a Nominatim
            $response = file_get_contents($url);
            $data = json_decode($response);

            if (!empty($data) && isset($data[0]->lat) && isset($data[0]->lon)) {
                $pdv->lat = $data[0]->lat; // Actualizar latitud
                $pdv->lng = $data[0]->lon; // Actualizar longitud
                $pdv->save(); // Guardar los nuevos datos en la base de datos
            }
        }

        return response()->json(['message' => 'Coordenadas actualizadas exitosamente']);
    }
}
