<?php

namespace App\Http\Controllers;

use App\Models\Pdv;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PdvController extends Controller
{
    /**
     * Display a listing of the PDVs.
     */
    public function index()
    {
        // Obtiene todos los PDVs ordenados por nombre
        $pdvs = Pdv::orderBy('pdv_name')->get();

        // Renderiza con Inertia la vista de gestión de PDVs
        return Inertia::render('PDVManagement', [
            'pdvs' => $pdvs,
        ]);
    }

    /**
     * Store a newly created PDV in storage.
     */
    public function store(Request $request)
    {
        // Validación de campos obligatorios
        $validated = $request->validate([
            'pdv_name'   => 'required|string|max:255',
            'address'    => 'required|string|max:255',
            'street_type'    => 'required|string|max:2',
            'street_name'    => 'required|string|max:100',
            'street_num'    => 'required|string|max:4',
            'cp'         => 'required|string|max:5',
            'city'       => 'required|string|max:100',
            'province'   => 'required|string|max:100',
        ]);

        // Crear nuevo PDV
        Pdv::create($validated);

        // Redireccionar de vuelta con mensaje de éxito
        return redirect()->route('pdvs.index')
            ->with('success', 'Punto de venta creado correctamente.');
    }

    /**
     * Show the form for editing the specified PDV.
     */
    public function edit(Pdv $pdv)
    {
        // Retorna datos del PDV para edición (puede consumirse vía JSON o Inertia)
        return response()->json($pdv);
    }

    /**
     * Update the specified PDV in storage.
     */
    public function update(Request $request, Pdv $pdv)
    {
        // Validación de los campos a actualizar
        $validated = $request->validate([
            'pdv_name'   => 'required|string|max:255',
            'address'    => 'required|string|max:255',
            'street_type'    => 'required|string|max:2',
            'street_name'    => 'required|string|max:100',
            'street_num'    => 'required|string|max:4',
            'cp'         => 'required|string|max:5',
            'city'       => 'required|string|max:100',
            'province'   => 'required|string|max:100',
        ]);

        // Actualizar PDV
        $pdv->update($validated);

        // Redireccionar con mensaje
        return redirect()->route('pdvs.index')
            ->with('success', 'Punto de venta actualizado correctamente.');
    }

    /**
     * Remove the specified PDV from storage.
     */
    public function destroy(Pdv $pdv)
    {
        // Eliminar PDV (soft delete si está configurado)
        $pdv->delete();

        // Redireccionar con mensaje
        return redirect()->route('pdvs.index')
            ->with('success', 'Punto de venta eliminado correctamente.');
    }
}
