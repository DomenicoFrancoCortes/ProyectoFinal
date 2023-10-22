import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinosService } from '../../services/destinos.service';
import { Destino } from '../../models/destino'

//Ini - Interface de listado de destinos
interface Idata {
  verano: Destino[];
  otono: Destino[];
  invierno: Destino[];
  primavera: Destino[];
}
//Fin - Interface de listado de destinos

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {

  data: any;
  lugares: Destino[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    actividades: [],
    eventos: []
  }];

  constructor(
    public destinosService: DestinosService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.lugares = this.destinosService.lugares;   
  }

  irDestino(destinoId: number) {
    console.log("Destino elegido: " + destinoId);
    this.destinosService.lugarElegido = destinoId;
    this.router.navigate(['/destino']);
  }  
}
