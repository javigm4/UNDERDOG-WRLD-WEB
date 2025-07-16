import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../general';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  standalone: false,
})
export class AdministracionComponent implements OnInit {
  nuevoEvento: Evento = {
    id: 0, // mejor 0 o null, porque es nuevo y no tiene id aún
    nombre: '',
    descripcion: '',
    fecha: '',
    ubicacion: '',
    max_participantes: 1,
  };
  eventos: any[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    //cargamos los eventos y los pasamos al componente de la edicion de eventos
    this.eventosService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  crearEvento(): void {
    // Aquí no hay validación reactiva, valida manualmente si quieres
    if (
      !this.nuevoEvento.nombre ||
      !this.nuevoEvento.fecha ||
      !this.nuevoEvento.descripcion ||
      !this.nuevoEvento.ubicacion ||
      this.nuevoEvento.max_participantes < 1
    ) {
      alert('Rellena todos los campos correctamente.');
      return;
    }

    this.eventosService.crearEvento(this.nuevoEvento).subscribe({
      next: (res) => {
        console.log('Evento creado:', res);
        alert('Evento creado con éxito');
        // resetear campos
        this.nuevoEvento = {
          id: 0,
          nombre: '',
          descripcion: '',
          fecha: '',
          ubicacion: '',
          max_participantes: 1,
        };
      },
      error: (err) => {
        console.error('Error al crear evento:', err);
        alert('Error al crear el evento. Inténtalo más tarde.');
      },
    });
  }

  eliminarEventoDelArray(id: number) {
    this.eventos = this.eventos.filter((evento) => evento.id !== id);
  }
}
