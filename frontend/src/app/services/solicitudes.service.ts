import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private urlObtenerSolicitudes = 'http://127.0.0.1:8000/api/solicitudes';
  private url = 'http://127.0.0.1:8000/api/';
  private urlAñadirParticipante = this.url + 'añadir-participante';
  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<any> {
    return this.http.get<any>(this.urlObtenerSolicitudes, {
      withCredentials: true,
    });
  }

  aceptarSolicitud(id: number): Observable<any> {
    // Usamos POST o PUT según tu backend, aquí suponemos POST
    return this.http.post(
      `${this.url}aceptar-solicitud/${id}`,
      {},
      { withCredentials: true }
    );
  }

  rechazarSolicitud(id: number): Observable<any> {
    return this.http.post(
      `${this.url}rechazar-solicitud/${id}`,
      {},
      { withCredentials: true }
    );
  }
}
