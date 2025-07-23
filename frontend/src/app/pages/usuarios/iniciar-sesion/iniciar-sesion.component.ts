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
  const loginData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(loginData).subscribe(
    (response) => {
      console.log('Login exitoso:', response);

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert(`Logeado como ${response.data.user.name}`);
      window.location.href = '/';
    },
    (error) => {
      alert('Credenciales inválidas');
    }
  );
}

}
