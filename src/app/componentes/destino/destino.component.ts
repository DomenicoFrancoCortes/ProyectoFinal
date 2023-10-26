import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Destino } from '../../models/destino'
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/app/models/user';

interface DatosDestJ {
  ID_DEST: number;
  TEMPORADA_ID: number;
  DEST_NOMBRE: string;
  DEST_DESC: string;
  TIPO: string;
  ID: number;
  NOMBRE: string;
}

interface Idata {
  ID_DEST: number;
  TEMPORADA_ID: number;
  DEST_NOMBRE: string;
  DEST_DESC: string;
  TIPO: string;
  ID: number;
  NOMBRE: string;
}

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {

  data: any;
  datos_dest: DatosDestJ[] = [];
  actividades: DatosDestJ[] = [];
  eventos: DatosDestJ[] = [];
  imagenes: string[] = [];
  user: User = {
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    code: '',
    showPassword: false
  };
  emailUsuario: string = '';
  destino_id: number = 0;

  constructor(
    public destinosService: DestinosService,
    private router: Router,
    private router2: ActivatedRoute,
    private cognitoService: CognitoService,
  ) {
    this.router2.queryParams.subscribe(params => {
      this.destino_id = params['id_dest'];
      console.log(this.destino_id);
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    //this.cargarImagenes();

    this.destinosService.obtenerDatosDest(this.destino_id)
      .subscribe(
        (data) => {
          this.data = data;
          this.datos_dest = this.data;
          this.actividades = this.datos_dest.filter((lugar) => lugar.TIPO === 'A');
          this.eventos = this.datos_dest.filter((lugar) => lugar.TIPO === 'E');
          console.log(this.datos_dest)
        },
        (error) => {
          console.error('Error al obtener datos destino: ', error);
        }
      );
  }
  
  private getUserDetails() {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      if (user) {
        this.emailUsuario = user.attributes.given_name;
        console.log(this.emailUsuario);
      } else {
        this.router.navigate(['/iniciar-sesion']);
      }
    })
  }

  irActividad(actividadId: number) {
    console.log("Actividad Id: " + actividadId);
    this.destinosService.actividadElegida = actividadId;
    this.router.navigate(['/actividad'], { queryParams: { act_id: actividadId } });
  }

  irEvento(eventoId: number) {
    console.log("Evento Id: " + eventoId);
    this.destinosService.eventoElegido = eventoId;
    this.router.navigate(['/evento'], { queryParams: { eve_id: eventoId } });
  }

  /*
  cargarImagenes() {
    switch (true) {
      case this.destino[0].id >= 100 && this.destino[0].id < 200:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/verano/" + this.destino[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.destino[0].id >= 200 && this.destino[0].id < 300:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/otonio/" + this.destino[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.destino[0].id >= 300 && this.destino[0].id < 400:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/invierno/" + this.destino[0].id + "_" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      case this.destino[0].id >= 400 && this.destino[0].id < 500:
        for (let i = 1; i < 4; i++) {
          this.imagenes[i - 1] = "https://nextripjson.s3.amazonaws.com/img/primavera/" + this.destino[0].id + "_0" + i + ".jpg";
          console.log(this.imagenes[i]);
        }
        break;
      default:
        break;
    }
  }
  */
}
