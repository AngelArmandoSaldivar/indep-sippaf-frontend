import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';

@Component({
  selector: 'sg-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.scss']
})
export class AnalisisComponent {
  @Input() tipo: number = 0;
  @Input() id_analisis: number = 0;
  @Input() solicitante = '';



  accionDetalle: number = 1; // accion de detalle
  documentoNombre: string = '';
  showDetalle: boolean = false;
  showCargaDocumento:boolean = false;
  FormularioConfirma !: FormGroup;
  
  showAgregarDocumento:  boolean = false;
  prevDocumento: boolean = false;
  prevAnexo: boolean = false;
  Seleccionado: number = 0;


  constructor(
    private confirmarModalService: ConfirmarModalService,
    private fb: FormBuilder,
    public toastrService: ToastrService
  ) {
    
  }

  

  datosDocumentos: any[] = [
    {
      nombreDoc: 'Acta'
    },
    {
      nombreDoc: 'CURP'
    },
    {
      nombreDoc: 'Identificacion Oficial'
    }
  ];


  cambioAccionDetalle(accion: number) {
    this.accionDetalle = accion;
  }

  abrirPdf(documentoNombre: string = '') {
    this.documentoNombre = documentoNombre;
    this.showDetalle = true;
  }

  cargarDocumento(documentoNombre: string = '', accion: string) {
    this.documentoNombre = documentoNombre
    this.showCargaDocumento = true;
  }

  





  
}
