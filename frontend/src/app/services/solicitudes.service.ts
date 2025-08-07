import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private urlObtenerSolicitudes = 'http://127.0.0.1:8000/api/solicitudes';
  private url = 'http://127.0.0.1:8000/api/';
  private urlAñadirParticipante = this.url + 'añadir-participante';
  private urlCrearSolicitud = this.url + 'crear-solicitud';
  private urlObtenerSolicitudesPorEvento = this.url + 'solicitudes/evento/';
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

  crearSolicitud(solicitud: {
    id_usuario: number;
    id_evento: number;
    estado: string;
    fecha_solicitud: string;
    procedencia: string;
    enlace_tiktok: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.urlCrearSolicitud, solicitud, { headers });
  }

  getSolicitudesByEventoId(eventoId: number): Observable<any> {
    return this.http.get<any>(
      `${this.urlObtenerSolicitudesPorEvento}${eventoId}`,
      {
        withCredentials: true,
      }
    );
  }
}
