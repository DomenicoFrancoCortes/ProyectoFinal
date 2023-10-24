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
export class DestinoNuevo {
  _ID?:number;
  tempo_id: number;
  nombre: string;
  desc: string;

  constructor(tempo_id:number,nombre: string, desc: string) {
    this.tempo_id = tempo_id;
    this.nombre = nombre;
      this.desc = desc;
  }
}
