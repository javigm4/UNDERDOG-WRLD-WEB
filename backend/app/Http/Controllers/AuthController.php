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
                'password' => 'required|min:6|confirmed',
                'name' => 'required|string|max:255|unique:users,name',
            ], [
                'email.required' => 'El correo es obligatorio.',
                'email.email' => 'El correo no tiene un formato válido.',
                'email.unique' => 'Este correo ya está registrado.',
                'name.required' => 'El nombre de usuario es obligatorio.',
                'name.unique' => 'Ese nombre de usuario ya está en uso.',
                'password.required' => 'La contraseña es obligatoria.',
                'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
                'password.confirmed' => 'Las contraseñas introducias no coinciden.',

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


    public function index()
    {
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
