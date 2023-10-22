import { Actividad } from './actividad'
import { Evento } from './evento';

export interface Destino {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    actividades: Actividad[];
    eventos: Evento[];
  }
