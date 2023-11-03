export interface Actividad {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria: string;
}
export class ActividadNueva {
    nombre: string;
    desc: string;
  categoria:string;
  dest_id:number;
    constructor(nombre: string, desc: string, categoria:string, dest_id:number) {
      this.nombre = nombre;
      this.desc = desc;
      this.categoria = categoria;
      this.dest_id = dest_id;
    }
  }