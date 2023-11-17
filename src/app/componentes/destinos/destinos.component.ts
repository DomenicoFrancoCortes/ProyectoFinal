import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinosService } from '../../services/destinos.service';
import { Destino, DestinoJson } from '../../models/destino'

interface DestinoJ {
  ID_TEMPO: number;
  ESTACION: string;
  ID_DEST: number;
  NOMBRE: string;
  DESC: string;
  IMAGEN: string;
}

interface Idata {
  ID_TEMPO: number;
  ESTACION: string;
  ID_DEST: number;
  NOMBRE: string;
  DESC: string;
  IMAGEN: string;
}

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {

  data: any;
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
    this.router2.navigate(['/destino'], { queryParams: { id_dest: destinoId } });
  }
   eliminarDestino(id_dest: number) {
     console.log(id_dest);
     this.destinosService.deleteDestino(id_dest).subscribe({
     next: data => {
         this.destinosService.obtenerDestinoTempo(this.estacionActual)
         .subscribe(
          (data) => {
        
            console.log(data);
          },
          (error) => {
            console.error('Error al obtener destinos: ', error);
          }
        );
         console.log("Se elimino destino");
        
       }, error: err => {
         console.log(err);
       }
     })
   }

}


