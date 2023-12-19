import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorCoperComponent } from './valor-coper.component';

describe('ValorCoperComponent', () => {
  let component: ValorCoperComponent;
  let fixture: ComponentFixture<ValorCoperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorCoperComponent]
    });
    fixture = TestBed.createComponent(ValorCoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
