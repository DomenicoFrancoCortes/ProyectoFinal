import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mensaje-modelo',
  templateUrl: './mensaje-modelo.component.html',
  styleUrls: ['./mensaje-modelo.component.css']
})
export class MensajeModeloComponent implements OnInit {

  @Input() message: string = '';
  @Output() modalClose = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
modalCloseClicked(){
  this.modalClose.emit(true);
}
}
