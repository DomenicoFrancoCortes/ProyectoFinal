export interface Evento {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    fecha: string;
}
export class EventoNuevo {
    nombre: string;
  desc: string;
  mes: string;
  dest_id:number;
  
    constructor(nombre: string, desc: string, mes: string, dest_id:number) {
      this.nombre = nombre;
      this.desc = desc;
      this.mes = mes;
      this.dest_id =dest_id;
    }
  }