import { Component, ViewChild,EventEmitter, Input, Output,OnInit  } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
//import { datosEtapasSolicitud } from 'src/app/models/datosEtapasSolicitud.model';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { dataArchivos,dataIDAcreditados, dataAcreditados, dataEdosmunis, dataAsuntos, dataMedios, dataTipopropuestas, dataEncomienda } from './dataDummyArchivos';
import { datosAtencion, documentos } from '../etapasAtenciones/detalle/detalle-atencion/datosAtencion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss']
})
export class AtencionesComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';

  decicion: boolean = false;
  tipoVista: boolean = true; 
  Seleccionado: number = 0;
  tituloSeleccionado: string = '';
  showAgregarAtencion: boolean = false;
  idacreditados =dataIDAcreditados;
  atenciones=datosAtencion;
  listaDatos: any[] = [];
  listaDetalle: any[] = [];
  encomiendas = dataEncomienda;
  seccion: string = 'Elige una opción';
  acreditados = dataAcreditados;
  archivo: string = 'Elige una opción';
  edosmunis: any = dataEdosmunis;
  asuntos=dataAsuntos;
  mediosatenciones=dataMedios;
  tipopropuestas=dataTipopropuestas;
  dataTablaArchivos = dataArchivos;
  pdfSrc: string = '';
  fInicio: string='';
  fFin:string='';
  ncli:string='';
  acre: string='';
  ida:string='';
  encomienda : string='';
  direccion: string='';
  estadoymuni: string='';
  muni:string='';
  ntel: string='';
  correo: string='';
  ninteres:string='';

  addSeccion: string = '';
  mostrarTabla: boolean = false;

  documentoNombre: string = '';
  // offcanvasInstance: any;
  //private offcanvasService: NgbOffcanvas, private modal: NgbModal, private config: NgbModalConfig,  config.backdrop = 'static'; config.keyboard = false;
  showDetalleAtencion: boolean = false;
  showDocumento: boolean = false;

  nombreDocumento: string = '';

  /*datosAtencion = datosAtencion;
  documentos = documentos;*/
  accionDetalle: number = 1; // accion de detalle
  showCamvasPrincipal: boolean = false;
  datosNombramiento: any;
  tipoAutorizacion: string = '';

  constructor(
    private toastrService : ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ) {
    this.Seleccionado = 1;
  }

  cambioAccionDetalle(accion: number) {
    this.accionDetalle = accion;
  }

  isDisplay = true;
  toggleDisplayMandato(){
    this.isDisplay=!this.isDisplay;
  }

  changeSeccion() {}

  changeSubseccion() {}

  changeArchivos() {}

  busquedaArchivos() {
    this.mostrarTabla = true;
  }

  agregarAtencion() {
    this.showAgregarAtencion = true;
  }

  cerrarOffCanvas( numero: number) {
    switch (numero) {
      case 1:
        this.showAgregarAtencion= false;
        break;
    
      default:
        break;
    }
  }

  //########################  FUNCIONES  OBLIGATORIAS###################################
  //Aqui Agregar el indice  que corresponda al estatus => componente  y ejecutarsu evento aprobar, rechazar, editar,
  // Todos los componentes que representan un estatus deben tener aaprobar, rechazar, editar



  imprimir() {
    console.log("imprimiendo...");
  }

  // SI AL FINAL CONFIRMA  EL ULTIMO MODAL ENTONCES CERRAMOS TODO, INCLUIDO EL CAMVAS ACTUAL Y ACTUALIZAMOS  LOS DATOS DEL ESTATUS DONDE ESTEMOS
  respuestaCofirmarModal(respuesta: boolean) {
    if (respuesta) this.cerrarCamvasPrincipal();

  }

  //######################## FIN  FUNCIONES  OBLIGATORIAS ###################################
  busquedaAtencion(){
    const idacreditado = new String(this.ida);
    const noCliente = new String(this.ncli);
    const acreditado = new String(this.acre);
    const encomienda = new String(this.encomienda);
    const direccion = new String(this.direccion);
    const estadoymuni = new String(this.estadoymuni);
    const muni = new String(this.muni);
    const ntel = new String(this.ntel);
    const correo = new String(this.correo);
    const ninteres = new String(this.ninteres);

    if (this.ida) {
      //this.toastrService.error('La fecha de inicio no puede ser mayor a la fecha final');
      this.ncli='261456';
      this.acre='Juan Pérez';
      this.encomienda= 'BANCOMEXT';
      this.direccion= 'Chalco';
      this.estadoymuni='Estado de México';
      this.muni='Chalco';
      this.ntel='4435678765';
      this.correo='andrea@gmail.com'; 
      this.ninteres='Juan Pérez López'
    }
  }

  cambioSeleccion(num: number) {
    this.Seleccionado = num;

    this.listaDatos = [{
      fecha: '01/05/2022',
      elaboro: 'Cristina León',
      noCliente: '261456',
      acreditado: 'Juan Pérez',
      encomienda: 'BANCOMEXT',
      direccion: 'Chalco',
      estadoymuni:'Estado de México',
      muni:'Chalco',
      telefono:'5584418748',
      correo:'andrea@gmail.com',
      asunto:'atención de acreditado',
      medioatencion:'email',
      montopropuesta:'10000',
      tipopropuesta:'prueba',
    },
    {
      fecha: '01/05/2022',
      elaboro: 'Janeth Martínez',
      noCliente: '261621',
      acreditado: 'Cristina León',
      encomienda: 'BANCOMEXT',
      direccion: 'Chalco',
      estadoymuni:'Estado de México',
      muni:'Chalco',
      telefono:'5584418748',
      correo:'andrea@gmail.com',
      asunto:'atención de acreditado',
      medioatencion:'email',
      montopropuesta:'10000',
      tipopropuesta:'prueba',
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
  
  guadarAtencion() {
    this.toastrService.success('Se ha guardado exitosamente el Nuevo Acreditado')
    this.showAgregarAtencion = false;
  }
  
  descargarAtencionespdf() {
    const downloadLink = document.createElement('a');
    const fileName = 'sampleAtenciones.pdf';
    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  descargarAtencionesexcel() {
    const downloadLink = document.createElement('a');
    const fileName = 'sampleAtenciones.xlsx';
    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
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
