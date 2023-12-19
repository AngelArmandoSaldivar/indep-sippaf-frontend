import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-valor-coper',
  templateUrl: './valor-coper.component.html',
  styleUrls: ['./valor-coper.component.scss']
})
export class ValorCoperComponent {
  showValidarContrasena: boolean = false;
  
  constructor( public toastrService: ToastrService ) {}

  validarContrasena() {
    this.showValidarContrasena = true  
  }

  validar() {
    this.toastrService.success('Valor Actualizado');
    this.cerrarCanvas();
  }
  cerrarCanvas() {
    this.showValidarContrasena = false;
  }

  changeSubseccion() {}

  

    
}
