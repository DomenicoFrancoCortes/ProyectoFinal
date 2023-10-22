import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextripComponent } from './nextrip.component';

describe('NextripComponent', () => {
  let component: NextripComponent;
  let fixture: ComponentFixture<NextripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
