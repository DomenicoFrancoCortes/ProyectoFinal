import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { MensajeModeloComponent } from './componentes/mensaje-modelo/mensaje-modelo.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { DestinoComponent } from './componentes/destino/destino.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { EventoComponent } from './componentes/evento/evento.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { NextripComponent } from './componentes/nextrip/nextrip.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    IniciarSesionComponent,
    MensajeModeloComponent,
    HomeComponent,
    DestinosComponent,
    DestinoComponent,
    ActividadComponent,
    EventoComponent,
    FavoritosComponent,
    NextripComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
