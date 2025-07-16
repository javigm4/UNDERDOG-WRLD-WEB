import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-eventos',
  standalone: false,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  password: string = '';
  constructor(
    private eventosService: EventosService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // <-- Falta aquí
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos() {
    console.log('Obteniendo eventos...');
    this.eventosService.getEventos().subscribe((response) => {
      this.eventos = response;
      console.log('Eventos cargados:', this.eventos);
    });
  }

  accederComoAdmin(event: Event) {
    event.preventDefault();
    this.authService.verificarClaveAdmin(this.password).subscribe((res) => {
      if (res.acceso) {
        localStorage.setItem('esAdmin', 'true'); // guardamos el flag en localstorage ese
        this.router.navigate(['/administracion']);
      } else {
        alert('Contraseña incorrecta');
      }
    });
  }

  abrirForm() {
    const form = document.getElementById('creatorForm');
    if (form) {
      form.style.display = 'block';
    }
  }
}
