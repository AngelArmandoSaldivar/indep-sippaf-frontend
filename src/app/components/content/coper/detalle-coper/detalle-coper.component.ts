import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';

@Component({
  selector: 'sg-detalle-coper',
  templateUrl: './detalle-coper.component.html',
  styleUrls: ['./detalle-coper.component.scss']
})
export class DetalleCoperComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';

  showDetalleSolicitud: boolean = false;
  showDocumento: boolean = false;
  showGenerarOficio: boolean = false;
   showObs: boolean = false;
  showAgregarDocumento:  boolean = false;
  showAgregarNota:  boolean = false;
  showAgregarFormato:  boolean = false;
  showAgregarAnexo: boolean = false;
  nombreDocumento: string = '';
  documentoFileName: string = "Ubicación del documento";
  prevDocumento: boolean = false;
  accionDetalle: number = 1;
  dataAnexos: any[] = [];
  dataDocumentos: any[] = [];
  prevAnexo: boolean = false;
  prevNota: boolean=false;
  prevFormato: boolean=false;
  notificacionPrim: boolean = false;
  notificacionSeg: boolean = false;
  notificacionTerc: boolean = false;
  documentoNombre: string = '';
  pdfSrc:string = '';
  pdfSrc2:string = '';
  showDetalle: boolean = false;
  tipoModal: string = 'true';
  showPdf:boolean = false;
  showCamvasPrincipal: boolean = false;
  anexoFileName: string = "Ubicación del anexo";

  constructor(
    private toastrService : ToastrService,  
    private confirmarModalService: ConfirmarModalService,  
  ) {
    this.dataAnexos = [
      {
        name: "NOTA 1",
      },
      {
        name: "NOTA 2",
      },
      {
        name: "NOTA 3",
      },
    ]
    this.dataDocumentos = [
      {
        name: "Documento 1",
      },
      {
        name: "Documento 2",
      },
    ]
  }

  mostrarDetalle() {
    this.showDetalleSolicitud = true;    
  }

  cerrarCanvas(tipo: string) {
    switch (tipo) {
      case 'oficio':
        this.showGenerarOficio = false;
        break;
      case 'documento':
        this.showAgregarDocumento = false;
        break;
      case 'nota':
        this.showAgregarNota = false;
        break;
      case 'formato':
          this.showAgregarFormato = false;
        break;     
      case 'prevDocumento':
        this.prevDocumento = false;
        break;
      case 'prevAnexo':
        this.prevAnexo = false;
        break;
      case 'showAgregarAnexo':
        this.showAgregarAnexo = false;
        break;
      case 'prevNota':
        this.prevNota = false;
        break;
      case 'prevFormato':
        this.prevFormato = false;
      break;
      default:
      break;
    }
  }

  verDocumento(filename: string) {
    this.showDocumento = true;
    this.nombreDocumento = filename;    
  }

  generarOficio() {
    this.showGenerarOficio = true;
  }
  agregarDocumento() {
    this.showAgregarDocumento = true;
  }

  onDocumentoFileChange(event: any){
    this.documentoFileName = event.target.files[0].name;
  }
  previsualizarDocumento() {
    this.prevDocumento = true;
  }
  
  previsualizarAnexo() {
    this.prevAnexo = true;
  }

  guardarDocumento() {
    this.toastrService.success('Archivo Cargado')
    this.showAgregarDocumento = false;
  }
  cambioAccionDetalle(accion : number) {
    this.accionDetalle = accion;
  }

  openVistaPreviaAnexo(documentoNombre: string = '',  tipo: string) {
    console.log(documentoNombre);
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('anexo')) {
      this.pdfSrc = "../../../../../assets/ejemplo.pdf";
      this.abrirPdf();
    }
  }
  abrirPdf(){
    this.prevAnexo = true;
  }
  descargarAnexo() {
    this.toastrService.success('Se ha descargado correctamente el comprobante de pago.')
  }

  primeraNotificacionDatos() { 
    this.notificacionPrim = !this.notificacionPrim
  }

  segundaNotificacionDatos() {
    this.notificacionSeg = !this.notificacionSeg
  }

  terceraNotificacionDatos() {
    this.notificacionTerc = !this.notificacionTerc
  }
  
  descargarComprobante() {
    const downloadLink = document.createElement('a');
    const fileName = 'sampleComprobante.pdf';
    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
    this.toastrService.success('Se ha descargado correctamente el comprobante de pago.')
  }
  cerrarCamvasPrincipal() {
    this.showCamvasPrincipal = false;
  }

  respuestaCofirmarModal(respuesta: boolean) {
    if (respuesta) this.cerrarCamvasPrincipal();
    this.toastrService.success("Registro guardado correctamente.")
  }

  confirmarCOPER() {
    this.confirmarModalService.abriraModalCOPER('Al completar este régistro, se marcará como completada la tarea.').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.toastrService.success("Modúlo Completado");
  
      }
    });
  }

  agregarAnexo() {
    this.showAgregarAnexo = true;
  }
  
  descargasArchivos(tipoArchivo: string = '') {
    if (tipoArchivo == 'documento') {
      this.toastrService.success(`Se ha descargado correctamente el ${tipoArchivo}.`)
    } else {
      this.toastrService.success(`Se ha descargado correctamente el ${tipoArchivo}.`)
    }
  }

  abrirPdfDocummento() {
    this.prevDocumento = true;
  }

  openVistaPreviaDocumento(documentoNombre: string = '',  tipo: string) {
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('documento')) {
      this.pdfSrc = "../../../../../assets/nombre.pdf";
      this.abrirPdfDocummento();
    }
  }

  guardarAnexo() {
    this.toastrService.success('Se ha guardado exitosamente el anexo.')
    this.showAgregarAnexo = false;
  }
  onAnexoFileChange(event: any) {
    this.anexoFileName = event.target.files[0].name;
  }

  //Notas

  guardarNota(){
    this.toastrService.success('Nota guardada exitosamente.')
    this.showAgregarNota = false;
  }

  openVistaPreviaNota(documentoNombre: string = '',  tipo: string) {
    console.log(documentoNombre);
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('nota')) {
      this.pdfSrc = "../../../../../assets/ejemplo.pdf";
      this.abrirPdf();
    }
  }

  agregarNota() {
    this.showAgregarNota = true;
  }

  previsualizarNota() {
    this.prevNota = true;
  }



  //Formatos

  guardarFormato(){
    this.toastrService.success('Formato guardado exitosamente.')
    this.showAgregarFormato = false;
  }

  openVistaPreviaFormato(documentoNombre: string = '',  tipo: string) {
    console.log(documentoNombre);
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('formato')) {
      this.pdfSrc = "../../../../../assets/ejemplo.pdf";
      this.abrirPdf();
    }
  }

  agregarFormato() {
    this.showAgregarFormato = true;
  }

  previsualizarFormato() {
    this.prevFormato = true;
  }
}