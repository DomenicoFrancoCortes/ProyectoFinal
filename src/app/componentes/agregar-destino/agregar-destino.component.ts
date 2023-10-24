import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestinoNuevo } from 'src/app/models/destino';
import { DestinosService } from 'src/app/services/destinos.service';

@Component({
  selector: 'app-agregar-destino',
  templateUrl: './agregar-destino.component.html',
  styleUrls: ['./agregar-destino.component.css']
})
export class AgregarDestinoComponent implements OnInit {

  destinoForm: FormGroup;
  id: string | null;


  constructor(private fb: FormBuilder, private actRouter: ActivatedRoute, private destinoService: DestinosService) {
    this.destinoForm = this.fb.group({
      tempo_id: ['', Validators.required],
      nombre: ['', Validators.required],
      desc: ['', Validators.required]

    });
    this.id = this.actRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }
  agregarDestino() {
    if (this.id !== null) {

      const DESTINO: DestinoNuevo = {
        tempo_id: this.destinoForm.value.tempo_id,
        nombre: this.destinoForm.value.nombre,
        desc: this.destinoForm.value.desc,

      };

      this.destinoService.putDestinoSeleccionado(this.id, DESTINO).subscribe({
        next: () => {
          console.log('destino modificado');

        },
        error: (err) => {
          console.log(err);
          this.destinoForm.reset();
        },
      });
    } else {

      const DESTINO: DestinoNuevo = {
        tempo_id: this.destinoForm.value.tempo_id,
        nombre: this.destinoForm.value.nombre,
        desc: this.destinoForm.value.desc,
        
      };
      console.log('ESTE ES EL METODO', DESTINO);


      this.destinoService.postDestino(DESTINO).subscribe({
        next: () => {
          console.log('destino registrado');
          // this.toast.success('Destino agregado', ' ' , { timeOut: 2000 });
          // this.router.navigate(['/lista-destino']);
        },
        error: (err) => {
          console.log(err);
          this.destinoForm.reset();
        },
      });
    }
  }
}
