import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventoNuevo } from 'src/app/models/evento';
import { DestinosService } from 'src/app/services/destinos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.css']
})
export class AgregarEventoComponent implements OnInit {

  eventoForm: FormGroup;
  destino_id: number = 0;

  constructor(private fb: FormBuilder
    , private actRouter: ActivatedRoute,
    private actRouter2: ActivatedRoute,
    private location: Location
    , private destinosService: DestinosService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      desc: ['', Validators.required],
      mes: ['', Validators.required]

    });
    this.actRouter2.queryParams.subscribe(params => {
      this.destino_id = params['id_dest'];
      console.log('ID destino:' + this.destino_id);
    });
  }

  ngOnInit(): void {
  }
  agregarEvento() {
    const EVENTO: EventoNuevo = {
      nombre: this.eventoForm.value.nombre,
      desc: this.eventoForm.value.desc,
      mes: this.eventoForm.value.mes,
      dest_id: this.destino_id,
    };
    this.destinosService.postEvento(EVENTO).subscribe({
      next: () => {
        console.log('Evento registrado');
        this.eventoForm.reset();
      },
      error: (err) =>{
      console.log(err);
      this.eventoForm.reset();
    },
  });
}
goBack(): void {
  this.location.back();
}
}
