<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PDV;
use App\Models\Task;
use App\Models\GoalsProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $pdvs = $user->assignedPdvs; // Usando la relación que ya tienes definida

        return Inertia::render('dashboard', [
            'pdvs' => $pdvs,
            'tasks' => Task::all(),
            'objectives' => GoalsProgress::all(),
        ]);
    }
    public function getUsers(Request $request)
    {
        $users = User::all(); // Obtener todos los usuarios
        return response()->json($users); // Devolver usuarios en formato JSON
    }

    public function getAssignedPdvs(Request $request)
    {
        try {
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

        } catch (Exception $e) {
            return response()->json(['message' => 'Error al obtener los puntos de venta', 'error' => $e->getMessage()], 500);
        }
    }

}
