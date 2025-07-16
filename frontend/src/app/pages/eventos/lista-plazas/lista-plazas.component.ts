import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-plazas',
  standalone: false,
  templateUrl: './lista-plazas.component.html',
  styleUrl: './lista-plazas.component.css'
})
export class ListaPlazasComponent {
  @Input() eventos: any[] = []; // Recibe los eventos desde el componente padre
}
