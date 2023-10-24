import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino, DestinoNuevo } from '../models/destino'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  url = 'https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino';
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

  constructor(
    public http: HttpClient
  ) {
  }

  obtenerDestinos() {
    console.log('haciendo GET a API destinos');
    return this.http.get('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino');
  }
  
  postDestino(prod: DestinoNuevo): Observable<any> {
    console.log('Haciendo post a API destinos');
    console.log(prod);
    return this.http.post('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino', prod);
  }
  putDestinoSeleccionado(id: string, dest: DestinoNuevo): Observable<any> {
    return this.http.put('https://ynzgyp33j1.execute-api.us-east-1.amazonaws.com/Destino' + id, dest);
  }
}

