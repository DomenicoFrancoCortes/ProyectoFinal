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
  id_dest?: number;
  tempo_id: number;
  nombre: string;
  desc: string;

  constructor(tempo_id: number, nombre: string, desc: string) {
    this.tempo_id = tempo_id;
    this.nombre = nombre;
    this.desc = desc;
  }
}

export class DestinoJson {
  id_tempo: number;
  estacion: string;
  id_dest: number;
  nombre: string;
  desc: string;

  constructor(id_tempo: number, estacion: string, id_dest: number, nombre: string, desc: string) {
    this.id_tempo = id_tempo;
    this.estacion = estacion;
    this.id_dest = id_dest;
    this.nombre = nombre;
    this.desc = desc;
  }
}

export class Temporada_Id {
  TEMPORADA_ID: number;

  constructor(TEMPORADA_ID: number) {
    this.TEMPORADA_ID = TEMPORADA_ID;
  }
}