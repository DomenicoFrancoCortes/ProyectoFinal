import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { Evento } from '../../models/evento'
import { FavoritosService } from 'src/app/services/favoritos.service';
import { ActivatedRoute } from '@angular/router';

interface EventoJ {
  ID_EVENTO: number;
  NOMBRE: string;
  DESCRIPCION: string;
  MES: string;
  DEST_ID: number;
}

interface Idata {
  ID_EVENTO: number;
  NOMBRE: string;
  DESCRIPCION: string;
  MES: string;
  DEST_ID: number;
}

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  data: any;
  evento: EventoJ[] = [];
  imagenes: string[] = [];
  evento_id: number = 0;

  constructor(
    public destinosService: DestinosService,
    public favoritosService: FavoritosService,
    private router: ActivatedRoute,
  ) {   
    this.router.queryParams.subscribe(params => {
      this.evento_id = params['eve_id'];
      console.log(this.evento_id);
    });      
  }

  ngOnInit(): void {
    //this.cargarImagenes();

    this.destinosService.obtenerEvento(this.evento_id)
      .subscribe(
        (data) => {
          this.data = data;
          this.evento = this.data;
          console.log(this.evento)
        },
        (error) => {
          console.error('Error al obtener datos evento: ', error);
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
      case this.evento[0].id >= 100 && this.evento[0].id < 200:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/verano/" + this.evento[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.evento[0].id >= 200 && this.evento[0].id < 300:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/otonio/" + this.evento[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.evento[0].id >= 300 && this.evento[0].id < 400:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/invierno/" + this.evento[0].id + "_" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.evento[0].id >= 400 && this.evento[0].id < 500:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/primavera/" + this.evento[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      default:
        break;
    }
  }
  */    
}
