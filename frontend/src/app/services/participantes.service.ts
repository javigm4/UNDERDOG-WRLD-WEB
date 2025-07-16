import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // <-- importa Subject y Observable
import { tap } from 'rxjs/operators'; // <-- para usar tap
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ParticipantesService {
  private url = 'http://127.0.0.1:8000/api/';
  private urlObtenerParticipantes = this.url + 'participantes';
  private urlEliminarParticipantes = this.url + 'eliminar-participante';
  private urlAñadirParticipantes = this.url + 'añadir-participante';

  private participanteAgregadoSource = new Subject<any>(); // <-- Subject privado
  participanteAgregado$ = this.participanteAgregadoSource.asObservable(); // observable público

  constructor(private http: HttpClient) {}

  getParticipantes(): Observable<any> {
    return this.http.get<any>(this.urlObtenerParticipantes, {
      withCredentials: true,
    });
  }

  eliminarParticipantes(id: number): Observable<any> {
    return this.http.delete(`${this.urlEliminarParticipantes}/${id}`, {
      withCredentials: true,
    });
  }

  añadirParticipante(participante: any): Observable<any> {
    return this.http
      .post<any>(this.urlAñadirParticipantes, participante, {
        withCredentials: true,
      })
      .pipe(
        tap((participanteCreado) =>
          this.participanteAgregadoSource.next(participanteCreado)
        )
      );
  }

  emitirParticipanteAgregado(participante: any) {
  this.participanteAgregadoSource.next(participante);
}

}
