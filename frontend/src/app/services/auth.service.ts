import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private apiUrlRegister = 'http://127.0.0.1:8000/api/register';
  private apiUrlLogout = 'http://127.0.0.1:8000/api/logout';
  private apiContraseña = 'http://127.0.0.1:8000/api/verificar-clave-admin';
  private apiUrlGetUsuarios = 'http://127.0.0.1:8000/api/usuarios';

  constructor(private http: HttpClient) {}
  // auth methods ... el observable es para que se pueda subscribir a los cambios a tiempo real
  login(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, {
      withCredentials: true,
    });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post<any>(
      this.apiUrlLogout,
      {},
      { withCredentials: true }
    );
  }

  // obtener los usuarios
  getUsuario(): any {
    const token = localStorage.getItem('token'); // obtenemos el token almacenado anteriormente
    if (token) {
      return token; // devolvemos el token, asi conseguimos el usuario completo
    }
    return null;
  }

  verificarClaveAdmin(clave: string): Observable<{ acceso: boolean }> {
    return this.http.post<{ acceso: boolean }>(
      this.apiContraseña,
      { clave },
      { withCredentials: true }
    );
  }

  // obtener los datos del usuario --> no sirve de momento ya que el token contiene toda la info del usuario
  getUsuarioData(): any {
    const userData = localStorage.getItem('user'); // obtenemos el usuario del token

    if (userData) {
      try {
        console.log(userData);
        return JSON.parse(userData); // convertimos a json y retornamos
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
        return null;
      }
    }
    return null;
  }


  //obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetUsuarios, {
      withCredentials: true,
    });
  }
}
