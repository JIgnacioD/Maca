<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Merchandising;

class MerchandisingController extends Controller
{
    public function index()
    {
        try {
            $merch = Merchandising::with([
                'subGoals:id,description',
                'usages' => function($query) {
                    $query->select('id', 'merchandising_subgoal_id', 'user_id', 'stock_used', 'load_at')
                          ->with(['user:id,name', 'merchandisingSubgoal.subGoal:id,description']);
                }
            ])->get();

            \Log::info('Merchandising cargado', ['cantidad' => $merch->count()]);

            $formatted = $merch->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'type' => $item->type,
                    'stock' => $item->stock,
                    'description' => $item->description,
                    'subgoals' => $item->subGoals->map(fn($sg) => [
                        'id' => $sg->id,
                        'name' => $sg->description
                    ]),
                    'usages' => $item->usages->map(fn($usage) => [
                        'id' => $usage->id,
                        'user' => [
                            'id' => $usage->user?->id,
                            'name' => $usage->user?->name
                        ],
                        'subgoal' => [
                            'id' => $usage->merchandisingSubgoal?->subGoal?->id,
                            'name' => $usage->merchandisingSubgoal?->subGoal?->description
                        ],
                        'used_quantity' => $usage->stock_used,
                        'used_at' => $usage->load_at
                    ])
                ];
            });

            return response()->json($formatted);
        } catch (\Throwable $e) {
            \Log::error('Error en merchandising: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al cargar merchandising',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
