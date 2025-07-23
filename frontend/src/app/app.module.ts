import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaVideosComponent } from './pages/inicio/lista-videos/lista-videos.component';
import { VideoComponent } from '../../../frontend/src/app/pages/inicio/video/video.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IniciarSesionComponent } from './pages/usuarios/iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuariosComponent } from './pages/usuarios/registro-usuarios/registro-usuarios.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ListaPlazasComponent } from './pages/eventos/lista-plazas/lista-plazas.component';
import { PlazaComponent } from './pages/eventos/plaza/plaza.component';
import { AdministracionComponent } from './administradores/administracion/administracion.component';
import { SolicitudesComponent } from './administradores/administracion/solicitudes/solicitudes.component';
import { EdicionEventosComponent } from './administradores/administracion/edicion-eventos/edicion-eventos.component';
import { EnlacesComponent } from './pages/eventos/enlaces/enlaces.component';
import { FormsModule } from '@angular/forms';
import { ParticipantesComponent } from './administradores/administracion/participantes/participantes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    ListaVideosComponent,
    VideoComponent,
    RegistroUsuariosComponent,
    FooterComponent,
    ContactanosComponent,
    EventosComponent,
    ListaPlazasComponent,
    PlazaComponent,
    AdministracionComponent,
    EdicionEventosComponent,
    SolicitudesComponent,
    ParticipantesComponent,
    IniciarSesionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EnlacesComponent,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
