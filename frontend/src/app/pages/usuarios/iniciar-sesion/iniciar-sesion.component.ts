import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: false,
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
})
export class IniciarSesionComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    //lo hemos añadido a la variable formData para que se pueda enviar al backend, ahora procedemos a llamar al servicio de autenticacion

    this.authService.login(formData).subscribe(
      (response)=> {
        console.log('Login exitoso:', response);

        localStorage.setItem('token', response.data.accessToken); //obtenemos los datos del token de acceso
        localStorage.setItem('user', JSON.stringify(response.data.user)); //obtenemos los datos del usuario

        alert(`Logeado como ${response.data.user.name}`); //mostramos un mensaje de confirmacion
        window.location.href = '/'; //redireccionamos a la pagina principal
      }
    )
  }
}
