import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plaza',
  standalone: false,
  templateUrl: './plaza.component.html',
  styleUrl: './plaza.component.css',
})
export class PlazaComponent {
  @Input() evento: any; // Recibe el evento desde el componente padre
  mostrarPopup = false;

  get idSanitizado(): string {
    return this.evento.nombre.replace(/\s+/g, '-').toLowerCase();
  }

  get plazasLibres(): number {
    return this.evento.plazas_libres ?? 0;
  }

  get participantes(): number {
    return this.evento.participantes_count ?? 0;
  }

  togglePopup() {
    this.mostrarPopup = !this.mostrarPopup;
  }
}
