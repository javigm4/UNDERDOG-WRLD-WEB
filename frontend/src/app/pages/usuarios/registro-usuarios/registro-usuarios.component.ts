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
      password_confirmation: this.passwordConfirmation, // aquí cambió
    };

    this.authService.register(data).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        alert(`Usuario registrado con éxito: ${data.email}`);
        window.location.href = '/iniciar-sesion'; // redirecciona al login
      },

      (error) => {
        console.error('Error al registrar el usuario:', error);
        if (error.status === 422) {
          const errores = error.error.errors; //obtenemos los errores enviados por el backend+
          let mensaje = 'Errores de validación:\n';
          for (const key in errores) {
            //los recorremos
            mensaje += `${key}: ${errores[key].join(', ')}\n`; //los mostramos
          }
          alert(mensaje); // mostramos los errores
        } else {
          alert(
            'Error desconocido. Por favor, pongase en contacto con el administrador.'
          );
        }
      }
    );
  }
}
