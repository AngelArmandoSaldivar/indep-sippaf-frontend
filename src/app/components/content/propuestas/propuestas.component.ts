import { Component, ViewChild, enableProdMode } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { datosEtapasPropuestas } from 'src/app/models/datosEtapasPropuesta.model';
import { ValidacionProComponent } from '../etapasPropuestas/validacion/validacionPro.component';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { dataPerfil } from '../rolesPerfiles/dataPerfiles';

@Component({
  selector: 'sg-propuesta',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.scss']
})
export class PropuestasComponent {
  decicion: boolean = false;
  tipoVista: boolean = true;
  Seleccionado: number = 0;
  tituloSeleccionado: string = '';
  listadoPropuestas: datosEtapasPropuestas[];
  listaDatos: any[] = [];
  tipoAccion: boolean = false;
  tipoDetalle: string = '';
  showObs: boolean = false;
  showCapturaSeguimiento = false;
  valueBoton: string = '';
  iconoBoton: string = '';
  cedulaFileName: string = "Ubicación de la cédula";
  otroFileName: string = "Ubicación de otro";

  colores:string='';
  fInicio: string='';
  fFin:string='';
  busqueda:string='';
  
  // offcanvasInstance: any;
  //private offcanvasService: NgbOffcanvas, private modal: NgbModal, private config: NgbModalConfig,  config.backdrop = 'static'; config.keyboard = false;

  showCamvasPrincipal: boolean = false;
  datosNombramiento: any;
  tipoAutorizacion: string = '';
  accion: number = 1; // accion de edicion
  showEditar: boolean = false;

  //Agergar archivo
  showAgregarArchivo: boolean = false;
  dataPerfil=dataPerfil;
  selectPerfil:number=0;
  pdfSrc: string = '';
  showReporteExcel: boolean = false;


  //Acciones de los componentes por estatus
  @ViewChild(ValidacionProComponent) ValidacionProComponent!: ValidacionProComponent;
  constructor(
    private toastrService : ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ) {
    
    this.Seleccionado = 1;
    this.listadoPropuestas = [
      //=========================ESTATUS ASIGNADOS A ACCION DEL USUARIO===============================
      // { indice: 1, titulo: 'Cancelados', activo: true, title: 'Solicitudes canceladas' ,noReg:25},
      // { indice: 2, titulo: 'Acción solicitante', activo: false, title: 'Solicitudes pendientes de acción del usuario' ,noReg:25},
      //=========================FIN ESTATUS ASIGNADOS A ACCION DEL USUARIO===============================
      { indice: 1, titulo: 'Validación', activo: false, title: '', noReg: 14 },
      { indice: 2, titulo: 'SIARAF', activo: false, title: '', noReg: 30 },
      { indice: 3, titulo: 'SAEDG', activo: false, title: '', noReg: 0 },
      { indice: 4, titulo: 'Juridico', activo: false, title: '', noReg: 15 },
      { indice: 5, titulo: 'CAPA', activo: false, title: '', noReg: 1 },
      { indice: 6, titulo: 'SIGEBI', activo: false, title: '', noReg: 0 },
      { indice: 7, titulo: 'Analisis', activo: false, title: '', noReg: 5 },
      { indice: 8, titulo: 'COPER', activo: false, title: '', noReg: 15 },
      { indice: 9, titulo: 'Acuerdos', activo: false, title: '', noReg: 3 }
    ]
  }

  //########################  FUNCIONES  OBLIGATORIAS###################################
  //Aqui Agregar el indice  que corresponda al estatus => componente  y ejecutarsu evento aprobar, rechazar, editar,
  // Todos los componentes que representan un estatus deben tener aaprobar, rechazar, editar
  aprobar() {
    switch (this.Seleccionado) {
      case 1: {
        this.ValidacionProComponent.aprobar();
        break;
      }
      default: {
        break;
      }
    }
  }

  openOficio() {
    switch (this.Seleccionado) {
      case 1: {
        this.ValidacionProComponent.openVistaPreviaOficio('oficio', 'verDocumento');
        break;
      }
      default: {
        break;
      }
    }
  }

  editar() {
    switch (this.Seleccionado) {
      case 1: {
        this.ValidacionProComponent.editar();
        break;
      }
      default: {
        break;
      }
    }
  }

  imprimir() {
    console.log("imprimiendo...");
  }

  // SI AL FINAL CONFIRMA  EL ULTIMO MODAL ENTONCES CERRAMOS TODO, INCLUIDO EL CAMVAS ACTUAL Y ACTUALIZAMOS  LOS DATOS DEL ESTATUS DONDE ESTEMOS
  respuestaCofirmarModal(respuesta: boolean) {
    if (respuesta) this.cerrarCamvasPrincipal();
    this.toastrService.success('Se ha guardado exitosamente el resgistro.')    
  }

  //######################## FIN  FUNCIONES  OBLIGATORIAS ###################################

  cambioSeleccion(num: number) {
    this.Seleccionado = num;
    this.listadoPropuestas.forEach(solicitud => {
      solicitud.activo = false;
    });
    this.listadoPropuestas.forEach(solicitud => {
      if (solicitud.indice == num) {
        solicitud.activo = true;
      }
    });

 

    switch (this.Seleccionado) {
      case 1: {
        this.tituloSeleccionado = 'Validación';
        break;
      }
      case 2: {
        this.tituloSeleccionado = 'SIARAF';
        break;
      }
      case 3: {
        this.tituloSeleccionado = 'SAEDG';
        break;
      }
      case 4: {
        this.tituloSeleccionado = 'Juridico';
        break;
      }
      case 5: {
        this.tituloSeleccionado = 'CAPA';
        break;
      }
      case 6: {
        this.tituloSeleccionado = 'SIGEBI';
        break;
      }
      case 7: {
        this.tituloSeleccionado = 'Analisis';
        break;
      }
      case 8: {
        this.tituloSeleccionado = 'COPER';
        break;
      }
      case 9: {
        this.tituloSeleccionado = 'Acuerdos';
        break;
      }
      default: {
        break;
      }
    }

    this.listaDatos = [{
      IdPropuesta:'001',
      RemitentePro: 'Juan Pérez',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'6,000',
      montoUSD:'300',
      propuestaDACION:'1,000',
      pagos:'5',
      plazaSoli:'15',
      capturista:'Maria Rosales',
      fechaCaptura:'01/05/2022',
      idResponsable:'002',
      NumVolante:'001',
      estatus: 'En espera documentación',
      tiempoAtencion:'yellow',
      asignado:'Roberto'
    },
    {
      IdPropuesta:'002',
      RemitentePro: 'María Rodríguez',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'8,000',
      montoUSD:'400',
      propuestaDACION:'8000',
      pagos:'5',
      plazaSoli:'16',
      capturista:'Jose Morales',
      fechaCaptura:'01/05/2022',
      idResponsable:'007',
      NumVolante:'002',
      estatus: 'Tarea completada',
      tiempoAtencion:'green',
      asignado:'Jaime'
    },
    {
      IdPropuesta:'003',
      RemitentePro: 'Carlos López',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'14,000',
      montoUSD:'700',
      propuestaDACION:'1,000',
      pagos:'4',
      plazaSoli:'10',
      capturista:'Elda Avila',
      fechaCaptura:'01/05/2022',
      idResponsable:'004',
      NumVolante:'003',
      estatus: 'Pendiente',
      tiempoAtencion:'red',
      asignado:'Erika'
    },
    {
      IdPropuesta:'004',
      RemitentePro: 'INDEP',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'6,000',
      montoUSD:'300',
      propuestaDACION:'1,000',
      pagos:'3',
      plazaSoli:'8',
      capturista:'Maria Rosales',
      fechaCaptura:'01/05/2022',
      idResponsable:'002',
      NumVolante:'004',
      estatus: 'Tarea completada',
      tiempoAtencion:'green',
      asignado:'Roberto'
    },
    {
      IdPropuesta:'005',
      RemitentePro: 'Laura Martínez',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'6,000',
      montoUSD:'300',
      propuestaDACION:'1,000',
      pagos:'5',
      plazaSoli:'10',
      capturista:'Jose Morales',
      fechaCaptura:'01/05/2022',
      idResponsable:'007',
      NumVolante:'005',
      estatus: 'Pendiente',
      tiempoAtencion:'red',
      asignado:'Jaime'
    },
    {
      IdPropuesta:'006',
      RemitentePro: 'Andrés Ramírez',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'6,000',
      montoUSD:'300',
      propuestaDACION:'1,000',
      pagos:'6',
      plazaSoli:'6',
      capturista:'Elda Avila',
      fechaCaptura:'01/05/2022',
      idResponsable:'004',
      NumVolante:'006',
      estatus: 'En espera documentación',
      tiempoAtencion:'yellow',
      asignado:'Roberto'
    },
    {
      IdPropuesta:'007',
      RemitentePro: 'Isabel Vega',
      fechaRecepcion: '01/05/2022',
      fechaPropuesta: '01/05/2022',
      tipoPropuesta:'Laboral',
      montoMXN:'16,000',
      montoUSD:'800',
      propuestaDACION:'1,000',
      pagos:'8',
      plazaSoli:'20',
      capturista:'Luis Gomez',
      fechaCaptura:'01/05/2022',
      idResponsable:'001',
      NumVolante:'007',
      estatus: 'Tarea completada',
      tiempoAtencion: 'green',
      asignado:'Erika'
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

  agregarArchivo(num: number) {
    this.selectPerfil = num;
    switch (this.selectPerfil) {
      case 1: {
        this.showAgregarArchivo = true;
        break;
      }
      case 2: {
        this.showAgregarArchivo = true;
        break;
      }
      case 3: {
        this.showAgregarArchivo = false;
        break;
      }
      default: {
        break;
      }
    }
  }
  confimarPropuesta() {
    this.confirmarModalService.abriraModal('Al guardar esta información se marcara como tarea completada').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.showCamvasPrincipal = false;
        this.toastrService.success("Se guardó correctamente la información");
  
      }

    });
   // this.showEditar = false;
   // this.toastrService.success("Se guardó correctamente la prevalidación");
  
  }
  reportePDF() {
    const downloadLink = document.createElement('a');
    const fileName = 'ReporteDetalle.pdf';

    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  reporteExcel() {
    const downloadLink = document.createElement('a');
    const fileName = 'ReporteDetalle.xlsx';

    downloadLink.href = this.pdfSrc;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  cerrarOffCanvas( numero: number) {
    switch (numero) {
      case 1:
        this.showAgregarArchivo = false;
        break;
    
      default:
        break;
    }
  }

  
  colorVentana(color:string){
    this.colores = color;
    if(color == 'green'){
      return '#66BB6A'
    }
    else if(color == 'red'){
      return '#F44336'
    }
    else{
      return '#FFEE58'
    }
  }
  guadarArchivo() {
    this.toastrService.success('Se ha guardado exitosamente la nueva propuesta')
    this.showAgregarArchivo = false;
  }
  
  tipoDetalleSeleccionado(tipoDetalle: any) {
    switch (tipoDetalle) {
      case 'juridico':
        this.iconoBoton = 'btn btn-positivo-modal';
        this.valueBoton = 'Guardar'
        break;
    
      default:
        break;
    }
  }

  completar(tipoCanvas: string) {
    this.tipoAccion = true;
    let mensaje = this.tipoAccion ? '¿Estas seguro de completar este paso? está acción cambiará el estatus de está etapa a ?' : '¿Estas seguro que quieres rechazar la opinión técnica?';
    let titulomsm = this.tipoAccion ? 'Se aprobo correctamente la opinión técnica ' : 'Se rechazo correctamente la opinión técnica';
    this.confirmarModalService.abriraModal(mensaje).subscribe(result => {
      if (result) {
        if(tipoCanvas == 'detalle')
        this.cerrarCamvasPrincipal();
        if(tipoCanvas == 'captura')
        this.cerrarCamvasPrincipal();
        this.showCapturaSeguimiento = false;
        this.toastrService.success("Registro completado correctamente")
      } else {                
        // El usuario canceló
        //this.valorRespuestaComfirmarModal.emit(false);
      }

    });
  }

  capturar(tipoAccion: string) {

    switch (tipoAccion) {
      case 'abrir':
        this.showCapturaSeguimiento = true;
        break;
      case 'guardarCaptura':
        this.showCapturaSeguimiento = false;
        this.toastrService.success("Registro guardado correctamente")
        break;
      case 'guardar':
        this.showCapturaSeguimiento = false;
        this.toastrService.success("Registro guardado correctamente")
        break;      
      default:
        this.showCapturaSeguimiento = false;
        break;
    }    
  }

  onCedulaFileChange(event: any){
    this.cedulaFileName = event.target.files[0].name;
  }

  onOtroFileChange(event: any){
    this.otroFileName = event.target.files[0].name;
  }
  comparaFechas() {
    const fechaInicioDate = new Date(this.fInicio);
    const fechaFinDate = new Date(this.fFin);

    if (fechaInicioDate > fechaFinDate) {
      this.toastrService.error('La fecha de inicio no puede ser mayor a la fecha final');
      this.fInicio='';
      this.fFin='';
    }
    if(fechaInicioDate < fechaFinDate){
      this.cambioSeleccion(1);      
    }
  }

  confirmarCOPER() {
    this.confirmarModalService.abriraModalCOPER('Al completar este régistro,se marcará como completada la tarea').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.toastrService.success("Modúlo Completado");
  
      }
    });

  }

  buscarPropuesta(){
    const fechaInicio = new Date(this.fInicio);
    const fechaFin = new Date(this.fFin);
    const busca = this.busqueda;
    this.comparaFechas();
      if(busca == ''){
        this.toastrService.error('Debe de ralizar un filtrado primero');
      }else{
        this.cambioSeleccion(1);
      }
    }

}
