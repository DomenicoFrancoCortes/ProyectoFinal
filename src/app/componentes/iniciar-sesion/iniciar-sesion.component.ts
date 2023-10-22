import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  user: User | undefined;
  
  alertMessage: string = '';
  showAlert: boolean = false;
  olvidoPassword: boolean = false;
  isForgotPassword: boolean = false;
  newPassword: string = '';
  
  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = {} as User;

  }

  signInWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.signIn(this.user).then(() => {
        this.router.navigate(['/'])
      }).catch((error: any) => {
        this.displayAlert(error.message);
      })
    } else {
      this.displayAlert('Ingrese un email y/o una contraseña valida')
    }
  }

  forgotPassWordClicked() {
    if (this.user && this.user.email) {
      this.cognitoService.forgotPassword(this.user).then(() => {
        this.isForgotPassword = true;
      }).catch((error: any) => {
        this.displayAlert(error.message);
      })
    } else {
      this.displayAlert('Para recuperar su contraseña ingrese en el campo Email un mail valido y vuelva a tocar olvido su contraseña')
    }
  }

  newPasswordSubmit() {
    if (this.user && this.user.code && this.newPassword) {
      this.cognitoService.forgotPasswordSubmit(this.user, this.newPassword.trim()).then(() => {
        this.displayAlert("Contraseña actualizada");
        this.isForgotPassword = false;
      }).catch((error: any) => {
        this.displayAlert(error.message);
      })
    } else {
      this.displayAlert("Por favor ingrese bien los datos");
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
