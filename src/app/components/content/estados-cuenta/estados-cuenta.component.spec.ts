import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosCuentaComponent } from './estados-cuenta.component';

describe('EstadosCuentaComponent', () => {
  let component: EstadosCuentaComponent;
  let fixture: ComponentFixture<EstadosCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadosCuentaComponent]
    });
    fixture = TestBed.createComponent(EstadosCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
