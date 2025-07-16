<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken; //crear token para meterlo en la web
        return response()->json([
            'data' => [
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ]
        ]);
    }

    public function register(Request $request)
    {
        try {
            //se valida si esta bien el email, password y nombre
            $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'name' => 'required|string|max:255',
            ]);

            $usuario = new User();
            $usuario->email = $request->email;
            $usuario->name = $request->name;
            $usuario->password = Hash::make($request->password);
            $usuario->save(); //se guarda el usuario en la base de datos
            return response()->json(['message' => 'Usuario registrado con éxito'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el registro',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->tokens()->delete(); // Elimina todos los tokens del usuario y asi hacemos que no haya sesion
            return response()->json(['message' => 'Logout exitoso'], 200);
        }
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }


    public function index() {
        $solicitudes = User::all();
        return $solicitudes;
    }

    //verificar contraseña para administracion
      public function verificar(Request $request)
    {
        $claveIngresada = $request->input('clave');

        // Idealmente esta clave debería venir de .env o de la base de datos
        $claveCorrecta = env('CLAVE_ADMIN', '1234');

        return response()->json([
            'acceso' => $claveIngresada === $claveCorrecta
        ]);
    }
}

