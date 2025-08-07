import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IniciarSesionComponent } from './pages/usuarios/iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuariosComponent } from './pages/usuarios/registro-usuarios/registro-usuarios.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AdministracionComponent } from './administradores/administracion/administracion.component';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirigir la raíz a /inicio (opcional)
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'registroUsuarios', component: RegistroUsuariosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'administracion', component: AdministracionComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
