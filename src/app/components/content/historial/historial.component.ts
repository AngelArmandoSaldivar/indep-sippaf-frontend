import { Component, ViewChild,EventEmitter, Input, Output  } from '@angular/core';
//import { NgbModal, NgbModalConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { datosAcreditado,documentos } from '../etapasAcreditados/detalle/detalle-acreditados/datosAcreditado';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';

import { dataArchivos, dataFiles } from './dataDummyArchivos';

@Component({
  selector: 'sg-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';
  decicion: boolean = false;
  prevAnexo: boolean = false;
  tipoVista: boolean = true;
  Seleccionado: number = 0;
  tituloSeleccionado: string = '';
  showAgregarAcreditado: boolean = false;
  ///listadoSolicitudes: datosEtapasSolicitud[];
  listaDatos: any[] = [];
  fInicio: string='';
  fFin:string='';
  datosAcreditado = datosAcreditado;
  documentos = documentos;

  archivo: string = 'Elige una opción';
  archivos: any = dataFiles;

  dataTablaArchivos = dataArchivos;
  addSeccion: string = '';
  mostrarTabla: boolean = false;

  documentoNombre: string = '';
  showDetalleAcreditado: boolean = false;
  showDocumento: boolean = false;

  nombreDocumento: string = '';
  pdfSrc: string = '';


  showCamvasPrincipal: boolean = false;
  datosNombramiento: any;
  tipoAutorizacion: string = '';
  


 
  constructor(
    private toastrService : ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ) {
    this.Seleccionado = 1;
    /*this.listadoSolicitudes = [

    ]*/
  }

  isDisplay = true;
  toggleDisplayMandato(){
    this.isDisplay=!this.isDisplay;
  }

  isDisplay1 = true;
  toggleDisplayCartera(){
    this.isDisplay1=!this.isDisplay1;
  }

    

  changeSeccion() {}

  changeSubseccion() {}

  changeArchivos() {}

  busquedaArchivos() {
    this.mostrarTabla = true;
  }

  agregarAcreditado() {
    this.showAgregarAcreditado = true;
  }

  cerrarOffCanvas( numero: number) {
    switch (numero) {
      case 1:
        this.showAgregarAcreditado = false;
        break;
    
      default:
        break;
    }
  }

 
  // SI AL FINAL CONFIRMA  EL ULTIMO MODAL ENTONCES CERRAMOS TODO, INCLUIDO EL CAMVAS ACTUAL Y ACTUALIZAMOS  LOS DATOS DEL ESTATUS DONDE ESTEMOS
  respuestaCofirmarModal(respuesta: boolean) {
    if (respuesta) this.cerrarCamvasPrincipal();

  }

  //######################## FIN  FUNCIONES  OBLIGATORIAS ###################################

  openVistaPreviaAnexo(documentoNombre: string = '',  tipo: string) {
    console.log(documentoNombre);
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('anexo')) {
      this.pdfSrc = "../../../../../assets/ejemplo.pdf";
      this.abrirPdf();
    }
  }
  abrirPdf(){
    this.prevAnexo = true
  }
  
  cambioSeleccion(num: number) {
    this.Seleccionado = num;
    /*this.listadoSolicitudes.forEach(solicitud => {
      solicitud.activo = false;
    });
    this.listadoSolicitudes.forEach(solicitud => {
      if (solicitud.indice == num) {
        solicitud.activo = true;
      }
    });*/

    this.listaDatos = [{
      nsesion: '12345',
      fechaasig: '21/10/2023',
      fechapresen: '25/10/2023',
      canal: 'Canal',
      fechavenci: '31/12/2023',
    },
    {
      nsesion: '56789',
      fechaasig: '11/11/2023',
      fechapresen: '18/11/2023',
      canal: 'Canal',
      fechavenci: '31/12/2023',
    }]
  }

  cambioTipoVista() {
    this.tipoVista = !this.tipoVista
  }


  abrirCamvasPrincipal(datos: any) {
    this.showCamvasPrincipal = true;
  }

  cerrarCamvasPrincipal() {
    this.showCamvasPrincipal = false;
  }
  
  guadarAcreditado() {
    this.toastrService.success('Se ha guardado exitosamente el nuevo acreditado.')
    this.showAgregarAcreditado = false;
  }

  descargarAcreditados() {
    const downloadLink = document.createElement('a');
    const fileName = 'sampleAcreditado.pdf';
    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  descargarComprobante() {
    const downloadLink = document.createElement('a');
    const fileName = 'sampleComprobante.pdf';
    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
    this.toastrService.success('Se ha descargado correctamente el comprobante de pago.')
  }

  cerrarCanvas(tipo: string) {
    switch (tipo) {
      case 'prevAnexo':
        this.prevAnexo = false;
        break;
      default:
        break;
    }
  }

  comparaFechas() {
    const fechaInicioDate = new Date(this.fInicio);
    const fechaFinDate = new Date(this.fFin);

    if (fechaInicioDate > fechaFinDate) {
      this.toastrService.error('La fecha de inicio no puede ser mayor a la fecha final.');
      this.fInicio='';
      this.fFin='';
    }
    if(fechaInicioDate < fechaFinDate){
      this.cambioSeleccion(1);      
    }
  }


}

