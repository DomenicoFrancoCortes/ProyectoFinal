import { Component, OnInit } from '@angular/core';
import { DestinosService } from '../../services/destinos.service';
import { Actividad } from '../../models/actividad'
import { FavoritosService } from 'src/app/services/favoritos.service';
import { ActivatedRoute, Router } from '@angular/router';

interface ActividadJ {
  ID_ACT: number;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  DEST_ID: number;
}

interface Idata {
  ID_ACT: number;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  DEST_ID: number;
}

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  data: any;
  actividad: ActividadJ[] = [];
  imagenes: string[] = [];
  actividad_id: number = 0;

  constructor(
    public destinosService: DestinosService,
    public favoritosService: FavoritosService,
    private router: ActivatedRoute,
    private router2: Router,
  ) { 
    this.router.queryParams.subscribe(params => {
      this.actividad_id = params['act_id'];
      console.log(this.actividad_id);
    });    
  }

  ngOnInit(): void {
    //this.cargarImagenes();

    this.destinosService.obtenerActividad(this.actividad_id)
      .subscribe(
        (data) => {
          this.data = data;
          this.actividad = this.data;
          console.log(this.actividad)
        },
        (error) => {
          console.error('Error al obtener datos actividad: ', error);
        }
      );    
  }
  eliminarActividad(id_act: number) {
    console.log(id_act);
    this.destinosService.eliminarActividad(id_act).subscribe({
    next: data => {
      console.log("se elimina actividad");
      this.router2.navigate(['/destino'], { queryParams: { id_dest: this.actividad[0].DEST_ID } });
      }, error: err => {
        console.log(err);
      }
    })
  }
}