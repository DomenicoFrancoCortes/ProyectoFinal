import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadNueva } from 'src/app/models/actividad';
import { DestinoNuevo } from 'src/app/models/destino';
import { DestinosService } from 'src/app/services/destinos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.css']
})
export class AgregarActividadComponent implements OnInit {

  actividadForm: FormGroup;
  
  destino_id: number = 0;
  
 
  constructor(
    private fb: FormBuilder
    , private router:Router,
    private actRouter2:ActivatedRoute,
    private location: Location
    , private destinosService: DestinosService) {

    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      desc: ['', Validators.required],
      categoria: ['', Validators.required]

    });
    this.actRouter2.queryParams.subscribe(params => {
      this.destino_id = params['id_dest'];
      console.log('ID destino:' + this.destino_id);
    });
  }
  ngOnInit(): void {
  
  }
  agregarActividad() {
    

      const ACTIVIDAD: ActividadNueva = {
        nombre: this.actividadForm.value.nombre,
        desc: this.actividadForm.value.desc,
        categoria: this.actividadForm.value.categoria,
        dest_id: this.destino_id,
      };
      console.log('ESTE ES EL METODO', ACTIVIDAD);


      this.destinosService.postActividad(ACTIVIDAD).subscribe({
        next: () => {
          console.log('Actividad registrada');
          // this.toast.success('Destino agregado', ' ' , { timeOut: 2000 });
          // this.router.navigate(['/lista-destino']);
          this.actividadForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.actividadForm.reset();
        },
      });
    
  }
  goBack(): void {
    this.location.back();
  }
  
}
