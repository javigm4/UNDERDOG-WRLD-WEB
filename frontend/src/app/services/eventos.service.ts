import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../general';
@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private url = 'http://127.0.0.1:8000/api/eventos';
  private urlCrearEvento = 'http://127.0.0.1:8000/api/crearEvento';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get<any>(this.url, {
      withCredentials: true,
    });
  }

  crearEvento(eventoData: any): Observable<any> {
    return this.http.post<any>(this.urlCrearEvento, eventoData);
  }

  actualizarEvento(evento: Evento): Observable<any> {
    return this.http.put(`${this.url}/${evento.id}`, evento);
  }

  eliminarEvento(id: number): Observable<any> {
  return this.http.delete(`${this.url}/${id}`);
}

}
