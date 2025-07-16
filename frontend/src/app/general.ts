export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  max_participantes: number;
  created_at?: string;
  updated_at?: string;
}
