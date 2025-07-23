import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro-usuarios',
  standalone: false,
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.css',
})
export class RegistroUsuariosComponent {
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  name: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const data = {
      email: this.email,
      name: this.name,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    };

    this.authService.register(data).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        alert(`Usuario registrado con éxito: ${data.email}`);
        window.location.href = '/iniciar-sesion'; // redirecciona al login
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario. Por favor, inténtelo de nuevo.');
      }
    );
  }
}
