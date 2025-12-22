<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Product::filter($request->only(['search', 'category']))->paginate(20)
        )->header('Cache-Control', 'public, max-age=60');
    }
}
