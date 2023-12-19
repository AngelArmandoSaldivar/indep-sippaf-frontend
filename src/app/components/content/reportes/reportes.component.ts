import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { ToastrService } from 'ngx-toastr';
import { dataAcreditados, dataFinanciero, dataCoper, dataSeguimientoCoper } from './dataReportes';

@Component({
  // imports: [NgbDropdownModule, AdminModule, CommonModule, FormsModule, ReactiveFormsModule, PdfViewerModule],
  // standalone: true,
  selector: 'sg-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent {
  filtrosReportes: boolean = false;
  Seleccionado: number = 0;
  showEditPerfilRol: boolean = false;
  listaDatos: any[] = [];
  nombrePerfil: string = 'Hola';
  isDisplay = false;
  showTipoReporte: boolean = false;
  filtroAtencion: boolean = false;
  atencionAcred: boolean = false;
  activosFin: boolean = false;
  subtitulo: string = '';
  dataAcreditados: any[] = [];
  dataFinanciero: any[] = [];
  dataCoper: any[] = [];
  dataSeguimientoCoper: any[] = [];
  tablaAtencionAcreditados: boolean = false;
  tablaFinancieros: boolean = false;
  tablaCoper: boolean = false;
  tablaSeguimientoCoper: boolean = false;
  opcion: number = 0;
  btnExport: boolean = false;

  constructor(
    public toastrService: ToastrService
  ) {       
    
  }

  changeSubseccion() {}

  cambioSeleccion() {

    this.btnExport = true;
    
    switch (this.opcion) {
      case 1:
        this.tablaAtencionAcreditados = true;
        this.dataAcreditados = dataAcreditados;
        this.tablaCoper = false;
        this.tablaSeguimientoCoper = false;
        this.tablaFinancieros = false;
        break;
      case 2:
        this.tablaFinancieros = true;
        this.tablaAtencionAcreditados = false;
        this.tablaCoper = false;
        this.tablaSeguimientoCoper = false;
        this.dataFinanciero = dataFinanciero;
        break;
      case 3:
        this.tablaFinancieros = false;
        this.tablaAtencionAcreditados = false;
        this.tablaCoper = true;
        this.tablaSeguimientoCoper = false;
        this.dataCoper = dataCoper;
        break;
      case 4:
        this.tablaFinancieros = false;
        this.tablaAtencionAcreditados = false;
        this.tablaCoper = false;
        this.tablaSeguimientoCoper = true;
        this.dataSeguimientoCoper = dataSeguimientoCoper;
        break;
      default:
        break;
    }
  }

  editarRolPerfil(nombre: string) {
    this.nombrePerfil = nombre;
    this.showEditPerfilRol = true  
  }
  guardar() {
    this.toastrService.success('Se ha descargado el archivo exitosamente');
    this.cerrarCanvas();
  }
  cerrarCanvas() {
    this.showEditPerfilRol = false;
  }
  filtros(tipo:string) {
    console.log("TIPO: " + tipo);
    switch (tipo) {      
      
      case 'atencionAcred':
        this.atencionAcred = true;
        this.filtrosReportes = true;
        this.subtitulo = 'Reporte atención de acreditados';
        this.opcion = 1;
        break;
      case 'activosFin':
        this.atencionAcred = false;  
        this.filtrosReportes = true;
        this.subtitulo = 'Propuestas de pago o compra de los acreditados o terceros relativas a activos financieros';
        this.opcion = 2;
      break;
      case 'coper':
        this.atencionAcred = true;
        this.filtrosReportes = true;
        this.subtitulo = 'Propuestas de pago sometidas y aprobadas por el COPER';
        this.opcion = 3;
        break;
      case 'seguiCoper':
        this.atencionAcred = true;
        this.filtrosReportes = true;
        this.subtitulo = 'Detalle de seguimiento de propuestas de pago o compra de los acreditados o terceros ante los órganos colegiados';
        this.opcion = 4;
        break;
      default:
        break;
    }    
  }
}
