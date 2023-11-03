import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Destino, DestinoNuevo, Temporada_Id } from '../models/destino'
import { Observable } from 'rxjs';
import { ActividadNueva } from '../models/actividad';
import { EventoNuevo } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  urlDestino = 'https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino';
  urlDatoDest = 'https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino/dest?id_dest=';
  urlActividad = 'https://c17gklu2a3.execute-api.us-east-1.amazonaws.com/actividad?act_id=';
  urlEvento = 'https://axush4jbmd.execute-api.us-east-1.amazonaws.com/evento?eve_id=';
  public destinoVerano: boolean = false;
  public destinoPrimavera: boolean = false;
  public destinoOtono: boolean = false;
  public destinoInvierno: boolean = false;

  public lugaresVerano: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];
  public lugaresInvierno: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];
  public lugaresOtono: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];
  public lugaresPrimavera: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];

  public lugares: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];
  public lugar: Destino = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  };
  public lugarElegido: number = 0;
  public actividadElegida: number = 0;
  public eventoElegido: number = 0;
  public estacionActual: number = 0;

  constructor(
    public http: HttpClient
  ) {
  }

  obtenerDestinos() {
    console.log('haciendo GET a API destinos');
    return this.http.get('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino');
  }

  obtenerDestinoTempo(id_tempo: number) {
    console.log(`GET a API destino TEMPORADA_ID: ${id_tempo}`);
    return this.http.get(this.urlDestino + '?temporada_id=' + id_tempo);
  }

  obtenerDatosDest(id_dest: number) {
    console.log(`GET a API destino ID_DEST: ${id_dest}`);
    return this.http.get(this.urlDatoDest + id_dest);
  }

  obtenerActividad(id_act: number) {
    console.log(`GET a API actividad ID_ACT: ${id_act}`);
    return this.http.get(this.urlActividad + id_act);
  }

  obtenerEvento(id_eve: number) {
    console.log(`GET a API evento ID_EVE: ${id_eve}`);
    return this.http.get(this.urlEvento + id_eve);
  }

  postDestino(prod: DestinoNuevo): Observable<any> {
    console.log('Haciendo post a API destinos');
    console.log(prod);
    return this.http.post('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino', prod);
  }
  putDestinoSeleccionado(id: string, dest: DestinoNuevo): Observable<any> {
    return this.http.put('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino' + id, dest);
  }
  postActividad(prod: ActividadNueva): Observable<any>{
    console.log(prod);
    return this.http.post('https://c17gklu2a3.execute-api.us-east-1.amazonaws.com/actividad', prod);
  }
  putActividadSeleccionada(id:string,act:ActividadNueva): Observable<any>{
    return this.http.put('https://c17gklu2a3.execute-api.us-east-1.amazonaws.com/actividad' + id, act);
  }
  postEvento(prod: EventoNuevo): Observable<any> {
    return this.http.post('https://axush4jbmd.execute-api.us-east-1.amazonaws.com/evento', prod);
  }

  deleteDestino(id_dest: number): Observable<any> {
    return this.http.delete('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino?id_dest=' + id_dest);
  }
  eliminarActividad(id_act: number) {
    
    return this.http.delete(this.urlActividad + id_act);
  }
  eliminarEvento(id_eve: number){
    return this.http.delete(this.urlEvento + id_eve);
  }
}
