import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
   standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
 modalVisible = false;

  abrirModal() {
    this.modalVisible = true;
  }

  cerrarModal(event: Event) {
    event.stopPropagation();
    this.modalVisible = false;
  }

  scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

}
