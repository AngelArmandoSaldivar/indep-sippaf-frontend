import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';

@Component({
  selector: 'sg-siaraf',
  templateUrl: './siaraf.component.html',
  styleUrls: ['./siaraf.component.scss']
})
export class SiarafComponent {
  @Input() tipo: number = 0;
  @Input() id_solicitud: number = 0;
  @Input() solicitante = '';



  
  Acciondetalle: number = 1;
 
  Documentonombre: string = '';
  Showdetalle: boolean = false;
  Showcargadocumento: boolean = false;
  Formularioconfirma !: FormGroup;
  Showagregardocumento: boolean = false;
  Prevdocumento: boolean = false;
  Prevanexo: boolean = false;
  Seleccionado: number = 0;


  constructor(
    private confirmarModalService: ConfirmarModalService,
    private fb: FormBuilder,
    public toastrService: ToastrService
  ) {
    
  }

  

  Datosdocumentos: any[] = [
    {
      Nombredoc: 'Acta'
    },
    {
      Nombredoc: 'CURP'
    },
    {
      Nombredoc: 'Identificación Oficial'
    }
  ];


  Cambioacciondetalle(accion: number) {
    this.Acciondetalle = accion;
  }

  Abrirpdf(Documentonombre: string = '') {
    this.Documentonombre = Documentonombre;
    this.Showdetalle = true;
  }

  Cargardocumento(Documentonombre: string = '', accion: string) {
    this.Documentonombre = Documentonombre
    this.Showcargadocumento = true;
  }

  





  
}
