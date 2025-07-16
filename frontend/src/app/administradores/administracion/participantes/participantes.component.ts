import { Component } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { ParticipantesService } from '../../../services/participantes.service';
import { AuthService } from '../../../services/auth.service';

type Solicitud = {
  id: number;
  email_usuario: string;
  nombre_usuario: string;
  estado?: string;
  fecha_solicitud?: string;
};

type EventoConParticipantes = {
  id: number;
  nombre: string;
  participantes: Solicitud[];
};

@Component({
  selector: 'app-participantes',
  standalone: false,
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css'],
})
export class ParticipantesComponent {
  participantes: any[] = [];
  eventosConParticipantes: EventoConParticipantes[] = [];
  filtroEvento: string = '';
  eventoAbiertoId: number | null = null;
  eventos: any[] = [];

  constructor(
    private eventosService: EventosService,
    private participantesService: ParticipantesService,
    private usuariosService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();

    this.participantesService.participanteAgregado$.subscribe((nuevoParticipante) => {
      this.participantes.push(nuevoParticipante);
      this.eventosConParticipantes = this.agruparParticipantesPorEvento(this.participantes, this.eventos);
    });
  }

  cargarDatos(): void {
    this.eventosService.getEventos().subscribe(
      (eventos) => {
        this.eventos = eventos;
        this.participantesService.getParticipantes().subscribe(
          (participantes) => {
            this.participantes = participantes;
            this.eventosConParticipantes = this.agruparParticipantesPorEvento(participantes, eventos);
          },
          (error) => {
            console.error('Error al obtener participantes:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  agruparParticipantesPorEvento(
    participantes: any[],
    eventos: any[]
  ): EventoConParticipantes[] {
    const mapaEventos = new Map<number, EventoConParticipantes>();

    participantes.forEach((p) => {
      if (!mapaEventos.has(p.id_evento)) {
        const eventoInfo = eventos.find((e) => e.id === p.id_evento);
        mapaEventos.set(p.id_evento, {
          id: p.id_evento,
          nombre: eventoInfo ? eventoInfo.nombre : `Evento ${p.id_evento}`,
          participantes: [],
        });
      }

      const evento = mapaEventos.get(p.id_evento)!;
      evento.participantes.push({
        id: p.id,
        email_usuario: p.email_usuario || p.email || '',  // Corregido email
        nombre_usuario: p.nombre_usuario || `Usuario ${p.id_usuario}`,  // Usa nombre si tienes
        estado: p.estado || undefined,
        fecha_solicitud: p.fecha_solicitud || undefined,
      });
    });

    return Array.from(mapaEventos.values());
  }

  toggleEvento(id: number): void {
    this.eventoAbiertoId = this.eventoAbiertoId === id ? null : id;
  }

  estaAbierto(id: number): boolean {
    return this.eventoAbiertoId === id;
  }

  get eventosFiltrados(): EventoConParticipantes[] {
    const filtro = this.filtroEvento.toLowerCase();
    return this.eventosConParticipantes.filter((evento) =>
      evento.nombre.toLowerCase().includes(filtro)
    );
  }

  eliminarParticipante(id: number): void {
    this.participantesService.eliminarParticipantes(id).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (error) => {
        console.error('Error al eliminar participante:', error);
      },
    });
  }
}
