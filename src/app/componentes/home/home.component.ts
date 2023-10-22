import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { DestinosService } from '../../services/destinos.service';
import { User } from 'src/app/models/user';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Favorito } from 'src/app/models/favorito';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;
  user: User = {
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    code: '',
    showPassword: false
  };

  emailUsuario: string = '';
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    public destinosService: DestinosService,
    public favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();

    this.ionViewDidLoad();

  }

  ionViewDidLoad() {
    this.destinosService.obtenerDestinos()
      .subscribe(
        (data) => {
          this.data = data;
          this.destinosService.lugaresInvierno = this.data.invierno;
          this.destinosService.lugaresOtono = this.data.otono;
          this.destinosService.lugaresVerano = this.data.verano;
          this.destinosService.lugaresPrimavera = this.data.primavera;
          console.log(this.destinosService.lugaresInvierno);
          this.cargarVerano();
        },
        (error) => { console.log(error); }
      );
  }

  cargarVerano(){
    this.favoritosService.listaActividades = this.destinosService.lugaresVerano[0].actividades;
    console.log(this.destinosService.lugaresInvierno);
    console.log(this.favoritosService.listaActividades.length);
    console.log("carga actividades: " + JSON.stringify(this.favoritosService.listaActividades));
  }

  private getUserDetails() {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      console.log(user);
      if (user) {
        this.emailUsuario = user.attributes.email;
        this.nombreUsuario = user.attributes.given_name + ' ' + user.attributes.family_name;
        this.favoritosService.userFavorito.email = this.emailUsuario;
        console.log(this.emailUsuario);
      } else {
        this.router.navigate(['/iniciar-sesion']);
      }
    })
  }

  signOutCognito() {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/iniciar-sesion']);
    })
  }

  irDestinos(estacion: string) {
    console.log("Estacion: " + estacion);
    switch (estacion) {
      case 'V':
        this.destinosService.destinoVerano = true;
        this.destinosService.lugares = this.destinosService.lugaresVerano;
        break;
      case 'I':
        this.destinosService.destinoInvierno = true;
        this.destinosService.lugares = this.destinosService.lugaresInvierno;
        break;
      case 'P':
        this.destinosService.destinoPrimavera = true;
        this.destinosService.lugares = this.destinosService.lugaresPrimavera;
        break;
      case 'O':
        this.destinosService.destinoOtono = true;
        this.destinosService.lugares = this.destinosService.lugaresOtono;
        break;
    }
    this.router.navigate(['/destinos']);
  }
}