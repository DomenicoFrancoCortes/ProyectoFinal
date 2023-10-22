import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;
  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUpWithCognito() {
  

    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.signUp(this.user).then(() => {
        this.isConfirm = true;
        
      }).catch((error: any) => {
        this.displayAlert(error.message);
        
      })
    }
    else{
      this.displayAlert("informacion incorrecta");
      console.log('usuario incorrecto')
    }
  }
  public confirmSingUp(){
    if(this.user){
      this.cognitoService.confirmSignUp(this.user).then(()=>{
        this.router.navigate(['/iniciar-sesion'])
      }).catch((error:any)=>{
        this.displayAlert(error.message);
      })
    }else{
      this.displayAlert("informacion incorrecta");
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

}
