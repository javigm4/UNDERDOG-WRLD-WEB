import { SolicitudesService } from '../../../services/solicitudes.service';
import { AuthService } from './../../../services/auth.service';
import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-plaza',
  standalone: false,
  templateUrl: './plaza.component.html',
  styleUrl: './plaza.component.css',
})
export class PlazaComponent {
  @Input() evento: any; // Recibe el evento desde el componente padre
  mostrarPopup = false;
  nombreUsuario: string = '';
  emailUsuario: string = '';
  idUsuario: number = 0;
  formularioVisible: boolean = false;
  procedenciaUsuario: string = '';
  enlaceTiktok: string = '';

  constructor(
    private authService: AuthService,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const user = this.authService.getUsuarioData();
    console.log('Usuario obtenido:', user);
    if (user) {
      this.nombreUsuario = user.name;
      this.emailUsuario = user.email;
      this.idUsuario = user.id;
    }

     this.solicitudesService.getSolicitudesByEventoId(this.evento.id).subscribe(
      (solicitudes) => {
        this.evento.solicitudes = solicitudes;
      },
      (error) => {
        console.error('Error cargando solicitudes:', error);
      },
  )}

  get idSanitizado(): string {
    return this.evento.nombre.replace(/\s+/g, '-').toLowerCase();
  }

  get plazasLibres(): number {
    return this.evento.plazas_libres ?? 0;
  }

  get participantes(): number {
    return this.evento.participantes_count ?? 0;
  }

  togglePopup() {
    this.mostrarPopup = !this.mostrarPopup;
  }

  fechaActual(): Date {
    return new Date();
  }

  get eventoCerrado(): boolean {
    const fechaEvento = new Date(this.evento.fecha);
    const hoy = new Date();

    // Opcional: compara solo por fecha (sin horas/minutos)
    hoy.setHours(0, 0, 0, 0);
    fechaEvento.setHours(0, 0, 0, 0);

    return fechaEvento < hoy;
  }

  // inscripcion

  // ---------------------------------------------------
  mostrarFormularioInscripcion() {
    const user = this.authService.getUsuarioData();

    if (!user) {
      alert('Debes iniciar sesión para inscribirte.');
      return;
    }

    // Mostrar formulario
    this.formularioVisible = true;
  }

  inscribirUsuario() {
    const user = this.authService.getUsuarioData();

    if (!user) {
      alert('Debes iniciar sesión para inscribirte.');
      return;
    }

    const solicitud = {
      id_usuario: user.id,
      id_evento: this.evento.id,
      estado: 'pendiente',
      fecha: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      procedencia: this.procedenciaUsuario,
      enlace_tiktok: this.enlaceTiktok,
    };

    this.solicitudesService.crearSolicitud(solicitud).subscribe(
      (response: any) => {
        console.log('Solicitud enviada con éxito:', response);
        alert('¡Solicitud enviada correctamente!');
      },
      (error: any) => {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un problema al inscribirte.');
      }
    );

    window.location.reload();
    this.formularioVisible = false; // Ocultar formulario después de enviar
  }

  get solicitudes(): any[] {
    return this.evento.solicitudes || [];
  }







  // Comprueba si el usuario ya está inscrito en el evento
  get yaInscrito(): boolean {
    if (!this.idUsuario || !this.solicitudes) {
      console.log('usuario noencontrador o solicitudes no disponibles');
      return false;
    } else {
      return this.solicitudes.some(
        (solicitud) =>
          solicitud.id_usuario === this.idUsuario &&
          solicitud.id_evento === this.evento.id
      );
    }
    // Recorre solicitudes y comprueba si hay alguna con el id_usuario igual al usuario actual y para este evento
  }
}
