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
  tipoVista: boolean = true;
  Seleccionado: number = 0;
  tituloSeleccionado: string = '';
  showAgregarAcreditado: boolean = false;
  listaDatos: any[] = [];
  fInicio: string='';
  fFin:string='';
  datosAcreditado = datosAcreditado;
  documentos = documentos;
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
  showCamvasPrincipal: boolean = false;

 
  constructor(
    private toastrService : ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ) {
    this.Seleccionado = 1;
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

  cambioSeleccion(num: number) {
    this.Seleccionado = num;
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

  //Compara Fechas
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

