<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::paginate(20));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('password123'), // Default password for added users
        ]);

        return response()->json($user, 201);
    }

    public function destroy($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted'], 200);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function destroyLast()
    {
        $user = User::latest()->first();
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Last user deleted'], 200);
        }
        return response()->json(['message' => 'No users found'], 404);
    }
}
