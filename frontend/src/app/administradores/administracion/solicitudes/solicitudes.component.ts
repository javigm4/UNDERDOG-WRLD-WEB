import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { AuthService } from '../../../services/auth.service';
import { ParticipantesService } from '../../../services/participantes.service';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

@Component({
  selector: 'app-solicitudes',
  standalone: false,
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
})
export class SolicitudesComponent implements OnInit {
  eventosConSolicitudes: any[] = [];
  usuarios: Usuario[] = [];
  filtroEvento: string = '';
  eventoAbiertoId: number | null = null;
  filtrosPorEvento: { [eventoId: number]: string } = {};
mostrarInfoId: number | null = null;

  constructor(
    private eventosService: EventosService,
    private solicitudesService: SolicitudesService,
    private usuariosService: AuthService,
    private participantesService: ParticipantesService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  rechazarSolicitud(solicitudId: number): void {
    this.solicitudesService.rechazarSolicitud(solicitudId).subscribe({
      next: () => {
        console.log(`Solicitud rechazada: ${solicitudId}`);
        this.cargarDatos();
      },
      error: (err) => console.error('Error rechazando solicitud:', err),
    });
  }

  aceptarSolicitud(data: {
    id: number;
    email: string;
    nombre: string;
    id_usuario: number;
  }) {
    this.solicitudesService.aceptarSolicitud(data.id).subscribe({
      next: (res: any) => {
        if (res.participante) {
          this.participantesService.emitirParticipanteAgregado(
            res.participante
          );
        }

        const solicitud = this.eventosFiltrados
          .flatMap((evento) => evento.solicitudes)
          .find((s) => s.id === data.id);
        if (solicitud) solicitud.estado = 'aceptado';
      },
      error: (err) => console.error('Error aceptando solicitud:', err),
    });
  }

  obtenerIdEventoPorSolicitud(idSolicitud: number): number | null {
    for (const evento of this.eventosFiltrados) {
      if (evento.solicitudes.some((s: any) => s.id === idSolicitud)) {
        return evento.id;
      }
    }
    return null;
  }

  cargarDatos(): void {
    Promise.all([
      this.eventosService.getEventos().toPromise(),
      this.solicitudesService.getSolicitudes().toPromise(),
      this.usuariosService.getUsuarios().toPromise(),
    ])
      .then(([eventos, solicitudes, usuarios]) => {
        this.usuarios = usuarios as Usuario[];

        this.eventosConSolicitudes = (eventos as any[]).map((evento) => {
          const solicitudesDelEvento = (solicitudes as any[])
            .filter((s) => s.id_evento === evento.id)
            .map((s) => {
              const usuario = this.usuarios.find((u) => u.id === s.id_usuario);
              return {
                ...s,
                nombre_usuario: usuario?.name || 'Desconocido',
                email_usuario: usuario?.email || '',
                enlace_tiktok: s.enlace_tiktok || '', // <-- Aquí se añade
              };
            });

          return {
            ...evento,
            solicitudes: solicitudesDelEvento,
          };
        });
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
      });
  }

  toggleEvento(id: number): void {
    this.eventoAbiertoId = this.eventoAbiertoId === id ? null : id;
  }

  estaAbierto(id: number): boolean {
    return this.eventoAbiertoId === id;
  }

  get eventosFiltrados(): any[] {
    const filtro = this.filtroEvento.toLowerCase();
    return this.eventosConSolicitudes.filter((evento) =>
      evento.nombre.toLowerCase().includes(filtro)
    );
  }

  solicitudesFiltradas(evento: any): any[] {
  const filtro = (this.filtrosPorEvento[evento.id] || '').toLowerCase().trim();

  if (!filtro) return evento.solicitudes;

  return evento.solicitudes.filter((solicitud: any) => {
    return (
      solicitud.nombre_usuario?.toLowerCase().includes(filtro) ||
      solicitud.email_usuario?.toLowerCase().includes(filtro) ||
      solicitud.enlace_tiktok?.toLowerCase().includes(filtro) ||
      solicitud.estado?.toLowerCase().includes(filtro) ||
      solicitud.fecha_solicitud?.toLowerCase().includes(filtro)
    );
  });
}

}
