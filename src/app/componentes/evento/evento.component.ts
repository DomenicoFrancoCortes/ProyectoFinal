import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { Evento } from '../../models/evento'
import { FavoritosService } from 'src/app/services/favoritos.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router2: Router
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

  eliminarEvento(id_eve: number) {
    console.log(id_eve);
    this.destinosService.eliminarEvento(id_eve).subscribe({
    next: data => {
      console.log("se elimina actividad");
      this.router2.navigate(['/destino'], { queryParams: { id_dest: this.evento[0].DEST_ID } });
      }, error: err => {
        console.log(err);
      }
    })
  }    
}
