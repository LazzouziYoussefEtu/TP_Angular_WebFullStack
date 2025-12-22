<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Split name into firstName and lastName for compatibility with frontend expectations if needed
            // The frontend model has firstName and lastName.
            $nameParts = explode(' ', $user->name);
            $firstName = $nameParts[0] ?? '';
            $lastName = isset($nameParts[1]) ? implode(' ', array_slice($nameParts, 1)) : '';

            return response()->json([
                'message' => 'Connexion réussie',
                'user' => [
                    'firstName' => $firstName,
                    'lastName' => $lastName,
                    'email' => $user->email,
                ]
            ], 200);
        }

        return response()->json([
            'message' => 'Email ou mot de passe incorrect'
        ], 401);
    }
}
