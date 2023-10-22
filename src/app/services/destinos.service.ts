import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino } from '../models/destino'

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

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
    return this.http.get('https://nextripjson.s3.amazonaws.com/json/destinos_v2.json');
  }
  
}
