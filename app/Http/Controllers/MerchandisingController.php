<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Merchandising;

class MerchandisingController extends Controller
{
    public function index()
    {
        $merchandisings = Merchandising::with(['subGoals', 'subGoals.merchandisingSubgoal.usages.user'])->get();

        return response()->json($merchandisings);
    }
}
