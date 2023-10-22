import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeModeloComponent } from './mensaje-modelo.component';

describe('MensajeModeloComponent', () => {
  let component: MensajeModeloComponent;
  let fixture: ComponentFixture<MensajeModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeModeloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
