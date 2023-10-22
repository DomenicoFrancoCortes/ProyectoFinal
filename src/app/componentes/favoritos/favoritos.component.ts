import { Component, OnInit } from '@angular/core';
import { DestinosService } from 'src/app/services/destinos.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Actividad } from '../../models/actividad'
import { Evento } from '../../models/evento'
import { Destino } from '../../models/destino'

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  data: any;  
  public ids: number[] = [];
  public nombres: string[] = [];
  //public nombres: any[] = [];
  public listaActividades: Actividad[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    categoria: ''
  }]
  public listaEventos: Evento[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    fecha: ''
  }]
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

  constructor(
    public destinosService: DestinosService,
    public favoritosService: FavoritosService 
  ) {
   }

  ngOnInit(): void {
    this.ionViewDidLoad();
    //this.cargarActividades();
    //this.cargarFavoritos();    
  }
  /*
  async ionViewDidLoad(): Promise<void> {
    try {
      const resultado = await this.destinosService.obtenerDestinos()
      .subscribe(
        (data) => {
          this.data = data;
          this.lugaresInvierno = this.data.invierno;
          this.lugaresOtono = this.data.otono;
          this.lugaresVerano = this.data.verano;
          this.lugaresPrimavera = this.data.primavera;
          console.log(this.lugaresInvierno);
          this.cargarActividades();
        },
        (error) => { console.log(error); }
      );
      console.log(resultado);
      // Realizar más operaciones con los datos obtenidos
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  */
  
  ionViewDidLoad() {
    this.destinosService.obtenerDestinos()
      .subscribe(
        (data) => {
          this.data = data;
          this.lugaresInvierno = this.data.invierno;
          this.lugaresOtono = this.data.otono;
          this.lugaresVerano = this.data.verano;
          this.lugaresPrimavera = this.data.primavera;
          console.log(this.lugaresInvierno);
          this.cargarActividades();
          this.cargarEventos();
          this.cargarFavoritos();
        },
        (error) => { console.log(error); }
      );
  }  
  
  cargarActividades(){
    for (let i = 0; i < this.lugaresVerano.length; i++) {
      if (i == 0){
        this.listaActividades = this.lugaresVerano[i].actividades;
      }else{
        this.listaActividades = this.listaActividades.concat(this.lugaresVerano[i].actividades);
      }
    }

    for (let i = 0; i < this.lugaresOtono.length; i++) {
      this.listaActividades = this.listaActividades.concat(this.lugaresOtono[i].actividades);
    }

    for (let i = 0; i < this.lugaresInvierno.length; i++) {
      this.listaActividades = this.listaActividades.concat(this.lugaresInvierno[i].actividades);
    }    

    for (let i = 0; i < this.lugaresPrimavera.length; i++) {
      this.listaActividades = this.listaActividades.concat(this.lugaresPrimavera[i].actividades);
    }       

    console.log(this.listaActividades.length);
    console.log("carga actividades: " + JSON.stringify(this.listaActividades));
  }

  cargarEventos(){
    for (let i = 0; i < this.lugaresVerano.length; i++) {
      if (i == 0){
        this.listaEventos = this.lugaresVerano[i].eventos;
      }else{
        this.listaEventos = this.listaEventos.concat(this.lugaresVerano[i].eventos);
      }
    }

    for (let i = 0; i < this.lugaresOtono.length; i++) {
      this.listaEventos = this.listaEventos.concat(this.lugaresOtono[i].eventos);
    }

    for (let i = 0; i < this.lugaresInvierno.length; i++) {
      this.listaEventos = this.listaEventos.concat(this.lugaresInvierno[i].eventos);
    }    

    for (let i = 0; i < this.lugaresPrimavera.length; i++) {
      this.listaEventos = this.listaEventos.concat(this.lugaresPrimavera[i].eventos);
    }       

    console.log(this.listaEventos.length);
    console.log("carga eventos: " + JSON.stringify(this.listaEventos));
  }  

  cargarFavoritos() {
    //Saca repetidos
    let sinRepetidos = this.favoritosService.userFavorito.favoritos.filter((item, index) => {
      return this.favoritosService.userFavorito.favoritos.indexOf(item) === index;
    })
    console.log("Sin repetidos: " + sinRepetidos);

    for (let i = 0; i < sinRepetidos.length; i++) {
      this.ids[i] = sinRepetidos[i];
    }

    for (let j= 0; j < sinRepetidos.length; j++) {
      console.log(this.ids[j]);
      switch (true) {
        case ((this.ids[j]%10 == 1) || (this.ids[j]%10 == 2) || (this.ids[j]%10 == 3)):
          let actividad = this.listaActividades.filter((act) => act.id === this.ids[j]);
          console.log(actividad[0]);
          this.nombres[j] = actividad[0].nombre;
          break;
        case ((this.ids[j]%10 == 6) || (this.ids[j]%10 == 7) || (this.ids[j]%10 == 8)):
          let evento = this.listaEventos.filter((eve) => eve.id === this.ids[j]);
          console.log(evento[0]);
          this.nombres[j] = evento[0].nombre;
          break; 
        default:
          this.nombres[j] = "No";
          break;
      }
      /*
      if ((this.ids[j]%10 == 1) || (this.ids[j]%10 == 2) || (this.ids[j]%10 == 3)){ 
        let actividad = this.listaActividades.filter((act) => act.id === this.ids[j]);
        console.log(actividad[0]);
        this.nombres[j] = actividad[0].nombre;
      }else{
        this.nombres[j] = "No";
      }
      */
    }
  }
}
