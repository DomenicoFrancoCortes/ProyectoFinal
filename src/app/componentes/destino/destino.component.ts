import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { Router } from '@angular/router';
import { Destino } from '../../models/destino'
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {

  destino: Destino[];
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

  constructor(
    public destinosService: DestinosService,
    private router: Router,
    private cognitoService: CognitoService,
  ) {
    this.destino = [{
      id: 0,
      nombre: '',
      descripcion: '',
      imagen: '',
      actividades: [],
      eventos: []
    }]
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.destino = this.destinosService.lugares.filter((lugar) => lugar.id === this.destinosService.lugarElegido);
    this.destinosService.lugar = this.destino[0];
    console.log("Destino :" + this.destino.toString);
    this.cargarImagenes();
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
    this.router.navigate(['/actividad']);
  }

  irEvento(eventoId: number) {
    console.log("Evento Id: " + eventoId);
    this.destinosService.eventoElegido = eventoId;
    this.router.navigate(['/evento']);
  }

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
}
