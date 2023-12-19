import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-detalle-capa',
  templateUrl: './detalle-capa.component.html',
  styleUrls: ['./detalle-capa.component.scss']
})
export class DetalleCapaComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';

  showDetalleSolicitud: boolean = false;
  showDocumento: boolean = false;
  showGenerarOficio: boolean = false;
  showAgregarDocumento:  boolean = false;
  showAgregarAnexo: boolean = false;
  nombreDocumento: string = '';
  documentoFileName: string = "Ubicación del documento";
  anexoFileName: string = "Ubicación del anexo";
  prevDocumento: boolean = false;
  accionDetalle: number = 1;
  dataAnexos: any[] = [];
  dataDocumentos: any[] = [];
  prevAnexo: boolean = false;
  documentoNombre: string = '';
  anexoNombre: string = '';
  pdfSrc:string = '';
  pdfSrc2:string = '';
  pdfSrcAnexo:string = '';
  pdfSrcDocumento:string = '';
  showDetalle: boolean = false;
  tipoModal: string = 'true';
  showPdf:boolean = false;
  showSustituirDocumento:boolean = false;
  showSustituirAnexo:boolean = false;

  constructor(
    private toastrService : ToastrService,    
  ) {
    this.dataAnexos = [
      {
        name: "Cedula jurídica",
      },
      {
        name: "Recordatorio",
      },
      {
        name: "Oficio solicitud",
      },
      {
        name: "Otro",
      },
    ];
    this.dataDocumentos = [
      {
        name: "Layout saldos",
      },
      {
        name: "Edo cuenta cert",
      },
      {
        name: "Oficio solicitud",
      },
      {
        name: "Dictamen jurídico",
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
      case 'prevDocumento':
        this.prevDocumento = false;
        break;
      case 'prevAnexo':
        this.prevAnexo = false;
        break;
      case 'showAgregarAnexo':
        this.showAgregarAnexo = false;
        break;
      case 'sustituirDocumento':
        this.showSustituirDocumento = false;
        break;
      case 'showSustituirAnexo':
        this.showSustituirAnexo = false;
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
  agregarAnexo() {
    this.showAgregarAnexo = true;
  }
  onDocumentoFileChange(event: any){
    this.documentoFileName = event.target.files[0].name;
    this.anexoFileName = event.target.files[0].name;
    this.pdfSrcDocumento = "../../../../../assets/anexo.pdf";      
    this.mostrarPdfADocumento()
  }
  onAnexoFileChange(event: any) {    
    this.anexoFileName = event.target.files[0].name;
    this.pdfSrcAnexo = "../../../../../assets/anexo.pdf";      
    this.mostrarPdfAnexo()
  }

  mostrarPdfAnexo() {
    this.pdfSrcAnexo = "../../../../../assets/nombre.pdf";
  }

  mostrarPdfADocumento() {
    this.pdfSrcDocumento = "../../../../../assets/nombre.pdf";
  }
  previsualizarDocumento() {
    this.prevDocumento = true;
  }
  previsualizarAnexo() {
    this.prevAnexo = true;
  }
  guardarDocumento(cadena: string) {
    if(cadena == 'cargarDocumento') {
      this.toastrService.success('Se ha guardado exitosamente el documento.')
      this.showAgregarDocumento = false;
    } else {
      this.toastrService.success('Se ha guardado exitosamente el documento.')
      this.showSustituirDocumento = false;
    }
    
  }
  guardarAnexo(cadena: string) {

    if (cadena == 'guardarAnexo') {
      this.toastrService.success('Se ha guardado exitosamente el anexo.')
      this.showAgregarAnexo = false;
    } else {
      this.toastrService.success('Se ha guardado exitosamente el anexo.')
      this.showSustituirAnexo = false;
    }
  }
  cambioAccionDetalle(accion : number) {
    this.accionDetalle = accion;
  }
  guardarOficio() {
    this.toastrService.success('Se ha guardado exitosamente el oficio.')
    this.showGenerarOficio = false;
  }  

  openVistaPreviaDocumento(documentoNombre: string = '',  tipo: string) {
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('documento')) {
      this.pdfSrc = "../../../../../assets/nombre.pdf";
      this.abrirPdfDocummento();
    }
  }

  openVistaPreviaAnexo(anexoNombre: string = '',  tipo: string) {
    this.anexoNombre = anexoNombre;
    if (anexoNombre.includes('anexo')) {
      this.pdfSrc = "../../../../../assets/nombre.pdf";
      this.abrirPdf();
    }
  }

  abrirPdf(){
    this.prevAnexo = true
  }

  abrirPdfDocummento() {
    this.prevDocumento = true;
  }

  descargasArchivos(tipoArchivo: string = '') {
    if (tipoArchivo == 'documento') {
      this.toastrService.success(`Se ha descargado correctamente el ${tipoArchivo}.`)
    } else {
      this.toastrService.success(`Se ha descargado correctamente el ${tipoArchivo}.`)
    }
  }

  descargarAnexo() {
    this.toastrService.success('Se ha descargado correctamente el anexo.')
  }

  descargarDocumento(documentoNombre: string = '', accion: string) {  
  }
  sustituirDocumento() {
    this.showSustituirDocumento = true;
  }
  sustituirAnexo() {
    this.showSustituirAnexo = true;
  }

}
  

