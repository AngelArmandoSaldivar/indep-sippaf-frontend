import { Component, ViewChild,EventEmitter, Input, Output,OnInit  } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
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

 
  tipoVista: boolean = true; 
  Seleccionado: number = 0;
  tituloSeleccionado: string = '';
  showAgregarAtencion: boolean = false;
  idacreditados =dataIDAcreditados;
  atenciones=datosAtencion;
  listaDatos: any[] = [];
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
  accionDetalle: number = 1; // accion de detalle
  showCamvasPrincipal: boolean = false;
  datosNombramiento: any;


  constructor(
    private toastrService : ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ) {
    this.Seleccionado = 1;
  }

  cambioAccionDetalle(accion: number) {
    this.accionDetalle = accion;
  }

  changeSeccion() {}

  changeSubseccion() {}

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


  abrirCamvasPrincipal(datos: any) {
    this.showCamvasPrincipal = true;
  }

  cerrarCamvasPrincipal() {
    this.showCamvasPrincipal = false;
  }
  
  guadarAtencion() {
    this.toastrService.success('Se ha guardado exitosamente la nueva atención al acreditado')
    this.showAgregarAtencion = false;
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
