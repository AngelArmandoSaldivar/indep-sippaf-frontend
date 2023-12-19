import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';

@Component({
  selector: 'sg-saedg',
  templateUrl: './saedg.component.html',
  styleUrls: ['./saedg.component.scss']
})
export class SaedgComponent {
  

  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';


  Acciondetalle: number = 1;
  Documentonombre: string = '';
  Showdetalle: boolean =false;
  Showgeneraroficio: boolean = false;
  Showagregardocumento: boolean = false;
  Prevdocumento: boolean = false;
  Prevanexo: boolean = false;
  Documentofilename: string = "Ubicación del documento";



  constructor(
    private confirmarModalService: ConfirmarModalService,
    private fb: FormBuilder,
    public toastrService: ToastrService
  ) {
    
  }

  Datosdocumentos: any[] = [
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
 


  abrirPdf(Documentonombre: string = '') {
    this.Documentonombre = Documentonombre;
    this.Showdetalle = true;
  }


  cambioAccionDetalle(accion: number) {
    this.Acciondetalle = accion;
  }

  generarOficio() {
    this.Showgeneraroficio = true;
  }


  cerrarCanvas(tipo: string) {
    switch (tipo) {
      case 'oficio':
        this.Showgeneraroficio = false;
        break;
      case 'documento':
        this.Showagregardocumento = false;
        break;    
      case 'prevDocumento':
        this.Prevdocumento = false;
        break;
      case 'prevAnexo':
        this.Prevanexo = false;
        break;
      default:
        break;
    }
  }


  guardarOficio() {
    this.toastrService.success('Se ha guardado exitosamente el oficio.')
    this.Showgeneraroficio = false;
  }  

  agregarDocumento() {
    this.Showagregardocumento = true;
  }

  onDocumentoFileChange(event: any){
    this.Documentofilename = event.target.files[0].name;
  }

  guardarDocumentos() {
    this.toastrService.success("Se ha guardado exitosamente el documento.")
    console.log('Documentos guardados:', this.Datosdocumentos);
  }

  completarTarea() {
    this.toastrService.success("Se ha completado la tarea exitosamente")
    console.log('Tarea completada');
  }

}
