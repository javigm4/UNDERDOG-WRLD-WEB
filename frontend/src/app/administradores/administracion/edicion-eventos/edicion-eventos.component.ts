import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
@Component({
  selector: 'app-edicion-eventos',
  standalone: false,
  templateUrl: './edicion-eventos.component.html',
  styleUrl: './edicion-eventos.component.css',
})
export class EdicionEventosComponent {
  @Input() evento: any; // Recibe el evento desde el componente padre
  mostrarPopup = false;
  mostrarConfirmacionEliminar = false;
  @Output() eventoEliminado = new EventEmitter<number>(); // <-- Añade esto

  constructor(private eventosService: EventosService) {}

  get idSanitizado(): string {
    return this.evento.nombre.replace(/\s+/g, '-').toLowerCase();
  }

  get plazasLibres(): number {
    return this.evento.plazas_libres ?? 0;
  }

  get participantes(): number {
    return this.evento.participantes_count ?? 0;
  }

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

  guardarCambios() {
    this.eventosService.actualizarEvento(this.evento).subscribe({
      next: (res) => {
        console.log('Evento actualizado:', res);
        this.cerrarPopup();
      },
      error: (err) => {
        console.error('Error actualizando evento:', err);
      },
    });
  }

  abrirConfirmacionEliminar() {
    this.mostrarConfirmacionEliminar = true;
  }

  cancelarEliminar() {
    this.mostrarConfirmacionEliminar = false;
  }

  confirmarEliminar() {
    this.eventosService.eliminarEvento(this.evento.id).subscribe({
      next: () => {
        this.mostrarConfirmacionEliminar = false;
        this.cerrarPopup();
        this.eventoEliminado.emit(this.evento.id); // aviso al padre que se eliminó
      },
      error: (err) => {
        console.error('Error al eliminar evento:', err);
      },
    });
  }
}
