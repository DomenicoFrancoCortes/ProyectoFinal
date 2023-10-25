import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinosService } from '../../services/destinos.service';
import { Destino, DestinoJson } from '../../models/destino'
import { map } from 'rxjs/operators';

//Ini - Interface de listado de destinos
interface DestinoJ {
  /* verano: Destino[];
  otono: Destino[];
  invierno: Destino[];
  primavera: Destino[]; */
  ID_TEMPO: number;
  ESTACION: string;
  ID_DEST: number;
  NOMBRE: string;
  DESC: string;
}


interface Idata {
  /* verano: Destino[];
  otono: Destino[];
  invierno: Destino[];
  primavera: Destino[]; */
  ID_TEMPO: number;
  ESTACION: string;
  ID_DEST: number;
  NOMBRE: string;
  DESC: string;
}
//Fin - Interface de listado de destinos

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {

  data: any;
  /*
  lugares: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];

  lugares: DestinoJson[] = [{
    id_tempo: 0,
    estacion: '',
    id_dest: 0,
    nombre: '',
    desc: ''
  }];
  */
  lugares: DestinoJ[] = [];
  estacionActual: number = 0;

  constructor(
    public destinosService: DestinosService,
    private router2: Router,
    private router: ActivatedRoute
  ) {
    this.router.queryParams.subscribe(params => {
      const temporada = params['temporada'];
      console.log(temporada);
      switch (temporada) {
        case 'V':
          this.estacionActual = 1;
          break;
        case 'I':
          this.estacionActual = 3;
          break;
        case 'P':
          this.estacionActual = 4;
          break;
        case 'O':
          this.estacionActual = 2;
          break;
        default:
          this.estacionActual = 0;
          break;
      }
    });
  }

  ngOnInit(): void {
    //this.lugares = this.destinosService.lugares; 

    this.destinosService.obtenerDestinoTempo(this.estacionActual)
      .subscribe(
        (data) => {
          this.data = data;
          this.lugares = this.data;
          console.log(this.lugares)
        },
        (error) => {
          console.error('Error al obtener destinos: ', error);
        }
      );
  }

  irDestino(destinoId: number) {
    console.log("Destino elegido: " + destinoId);
    this.destinosService.lugarElegido = destinoId;
    this.router2.navigate(['/destino']);
  }


}


