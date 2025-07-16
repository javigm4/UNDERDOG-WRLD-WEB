import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enlaces',
  templateUrl: './enlaces.component.html',
  styleUrls:  ['./enlaces.component.css']
})
export class EnlacesComponent {
  @Input() evento!: any;

  // Mismo sanitizado que usas en plaza.component
  get idSanitizado(): string {
    return this.evento.nombre.trim().toLowerCase().replace(/\s+/g, '-');
  }

  scrollToId() {
    const el = document.getElementById(this.idSanitizado);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
