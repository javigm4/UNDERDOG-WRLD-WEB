import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro-usuarios',
  standalone: false,
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.css'
})
export class RegistroUsuariosComponent {
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
 const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('passwordConfirmation', this.passwordConfirmation);

    //ahroa enviamos el formData al servicio de autenticacion
    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        alert(`Usuario registrado con éxito: ${response.data.user.email}`);
        window.location.href = '/iniciar-sesion'; // redireccionamos a la pagina de inicio de sesion
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario. Por favor, inténtelo de nuevo.');
      }
    );
  }


}
