import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestinoComponent } from './agregar-destino.component';

describe('AgregarDestinoComponent', () => {
  let component: AgregarDestinoComponent;
  let fixture: ComponentFixture<AgregarDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDestinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
