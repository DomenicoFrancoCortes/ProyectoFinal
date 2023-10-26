import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { Actividad } from '../../models/actividad'
import { FavoritosService } from 'src/app/services/favoritos.service';
import { ActivatedRoute } from '@angular/router';

interface ActividadJ {
  ID_ACT: number;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  DEST_ID: number;
}

interface Idata {
  ID_ACT: number;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  DEST_ID: number;
}

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  data: any;
  actividad: ActividadJ[] = [];
  imagenes: string[] = [];
  actividad_id: number = 0;

  constructor(
    public destinosService: DestinosService,
    public favoritosService: FavoritosService,
    private router: ActivatedRoute,
  ) { 
    this.router.queryParams.subscribe(params => {
      this.actividad_id = params['act_id'];
      console.log(this.actividad_id);
    });    
  }

  ngOnInit(): void {
    //this.cargarImagenes();

    this.destinosService.obtenerActividad(this.actividad_id)
      .subscribe(
        (data) => {
          this.data = data;
          this.actividad = this.data;
          console.log(this.actividad)
        },
        (error) => {
          console.error('Error al obtener datos actividad: ', error);
        }
      );    
  }

  /*
  guardarFavorito(id: number) {
    console.log("Favoritos antes: " + this.favoritosService.userFavorito.favoritos);

    //this.favoritosService.userFavorito.email = this.emailUsuario;
    this.favoritosService.userFavorito.favoritos.push(id);

    //Saca repetidos
    let sinRepetidos = this.favoritosService.userFavorito.favoritos.filter((item, index) => {
      return this.favoritosService.userFavorito.favoritos.indexOf(item) === index;
    })
    console.log("Sin repetidos: " + sinRepetidos); 
    
    //let favoritosUser = this.favoritosService.userFavorito.favoritos;
    let favoritosUser = sinRepetidos;
    
    console.log("Favoritos desp: " + favoritosUser);
    
    this.favoritosService.crearLista(this.favoritosService.userFavorito.email, favoritosUser);
   
    this.favoritosService.guardarFavoritos('https://9kqrh01hc4.execute-api.us-east-1.amazonaws.com/default/obtenerDato',
      `{"email": "${this.favoritosService.userFavorito.email}", "favoritos": [${this.favoritosService.userFavorito.favoritos}]}`).subscribe(respuesta => {
        console.log('comentario enviado');
      })
  }

  cargarImagenes() {
    switch (true) {
      case this.actividad[0].id >= 100 && this.actividad[0].id < 200:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/verano/" + this.actividad[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.actividad[0].id >= 200 && this.actividad[0].id < 300:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/otonio/" + this.actividad[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.actividad[0].id >= 300 && this.actividad[0].id < 400:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/invierno/" + this.actividad[0].id + "_" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.actividad[0].id >= 400 && this.actividad[0].id < 500:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/primavera/" + this.actividad[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      default:
        break;
    }
  }
  */  
}