import { Component, ViewChild,EventEmitter, Input, Output  } from '@angular/core';
//import { NgbModal, NgbModalConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { datosAcreditado,documentos } from '../etapasAcreditados/detalle/detalle-acreditados/datosAcreditado';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';

import { dataArchivos,dataMunicipio, dataFiles,dataEntidad,dataEncomienda, dataSucursal, TipoCartera } from './dataDummyArchivos';

@Component({
  selector: 'sg-acreditados',
  templateUrl: './acreditados.component.html',
  styleUrls: ['./acreditados.component.scss']
})
export class AcreditadosComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';
  decicion: boolean = false;

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
  municipios: any = dataMunicipio;
  dataTablaArchivos = dataArchivos;

  entidad: string = 'Elige una opción';
  entidades: any = dataEntidad;

  encomienda: string = 'Elige una opción';
  encomiendas: any = dataEncomienda;

  sucursal: string = 'Elige una opción';
  sucursales: any = dataSucursal;

  cartera: string = 'Elige una opción';
  carteras: any = TipoCartera;

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
      NombreAcreditado: 'Juan Pérez',
      IDAcreditado: '101',
      NoCliente: '261456',
      Fecharegistro: '01/05/2022',
      Tipomandato: 'BANCOMEXT',
      Tipocartera: 'OBJETIVO'
    },
    {
      NombreAcreditado: 'Isabel Vega',
      IDAcreditado: '102',
      NoCliente: '02614632',
      Fecharegistro: '01/05/2022',
      Tipomandato: 'FIDERCA',
      Tipocartera: 'CONTROL Y RESGUARDO'
    },
    {
      NombreAcreditado: 'Cristina León',
      IDAcreditado: '103',
      NoCliente: '0261167',
      Fecharegistro: '01/05/2022',
      Tipomandato: 'TESOFE',
      Tipocartera: 'OBJETIVO'
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

