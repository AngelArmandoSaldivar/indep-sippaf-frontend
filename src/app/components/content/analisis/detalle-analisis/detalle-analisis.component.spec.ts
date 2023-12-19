import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAnalisisComponent } from './detalle-analisis.component';

describe('DetalleSiarafComponent', () => {
  let component: DetalleAnalisisComponent;
  let fixture: ComponentFixture<DetalleAnalisisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAnalisisComponent]
    });
    fixture = TestBed.createComponent(DetalleAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
