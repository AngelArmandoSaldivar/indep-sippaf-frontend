import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';

@Component({
  // imports: [NgbDropdownModule, AdminModule, CommonModule, FormsModule, ReactiveFormsModule, PdfViewerModule],
  // standalone: true,
  selector: 'sg-acuerdos',
  templateUrl: './acuerdos.component.html',
  styleUrls: ['./acuerdos.component.scss'],
})
export class AcuerdosComponent {
  accionEditar: boolean = false;
  tipoAccion: boolean = false;
  accion: number = 1; // accion de edicion
  accionDetalle: number = 1; // accion de detalle

  listaImagenes: any[] = [];
  indiceActivoImagenes = 0;

  tipoSolicitante = '';

  FormularioConfirma!: FormGroup;
  certFileName: string = "Ubicación del certificado";
  keyFileName: string = "Ubicación de la llave privada";

  documentos = [
    {
      id: 1,
      tipoDocumento: 'Oficio de solicitud de O. T.',
      tipoFirma: false,
      firmaElectronica: false,
      firma: false,
      vistaPrevia: true,
      downloadDoc: false,
      upDocumento: false,
      eliminar: false,
    },
    {
      id: 2,
      tipoDocumento: 'Opinión técnica',
      tipoFirma: true,
      firmaElectronica: false,
      firma: true,
      vistaPrevia: true,
      downloadDoc: true,
      upDocumento: true,
      eliminar: true,
    },
    {
      id: 3,
      tipoDocumento: 'Documento REPUVE',
      tipoFirma: false,
      firmaElectronica: false,
      firma: false,
      vistaPrevia: true,
      downloadDoc: true,
      upDocumento: true,
      eliminar: true,
    },
  ]

  @Input() id_solicitud: number = 0;
  @Input() solicitante = '';

  showEditar: boolean = false;
  showObs: boolean = false;
  tituloObs: string = '';
  showDetalle: boolean = false;
  showFirma: boolean = false;
  showPdf:boolean = false;


  objetoDetalle: any = {};
  indiceObjetoDetalle: any = {};
  tipoModal: string = 'true';

  mostrarMensaje: boolean = true;

  documentoNombre: string = '';
  pdfSrc:string = '';
  pdfSrc2:string = '';
  firmaElectronica1: boolean = false;
  firmaElectronica2: boolean = false;

  // Dropdownn menu acciones
  isDropdownMenuAcciones: boolean = false;


  //TODOS LOS COMPONENTES QUE REPRECENTEN  UN ESTATUS DEBERAN TENER ESTE OUTPUT
  @Output() respuestaCofirmarModal = new EventEmitter<boolean>();

  constructor(
    private confirmarModalService: ConfirmarModalService,
    private fb: FormBuilder,
    public toastrService: ToastrService
  ) {
    this.crearFormularioConFirma();
    this.FormularioConfirma.controls['rfc'].disable();
    // this.pdfSrc = "../../../../../assets/Solicitud_Opinion_tecnica.pdf";
    

  }

  crearFormularioConFirma() {
    this.FormularioConfirma = this.fb.group({
      key: ['', [Validators.required]],
      cer: ['', [Validators.required]],
      contra: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_RFC)]],
    });
  }

  //TODOS LOS COMPONENTES QUE REPRECENTEN  UN ESTATUS DEBERAN TENER ESTAS FUNCONES
  aprobar() {
    // VALIDACIONES
    this.abrirCamvasObs(true);
    this.tituloObs = 'Aprobar';
  }

  rechazar() {
    // VALIDACIONES
    this.abrirCamvasObs(false);
    this.tituloObs = 'Rechazar';
  }

  editar() {
    this.abrirEditar();
  }

  cambioAccionDetalle(accion: number) {
    this.accionDetalle = accion;
  }

  //#################################################################################


  guardarOpinionTecnica() {
    this.showEditar = false;
    this.toastrService.success("Se guardó correctamente la opinión técnica.");

  }

  abrirEditar() {
    this.showEditar = true;
    this.accion = 1;
  }
  cerrarEditar() {
    this.confirmarModalService.abriraModal('¿Seguro quieres salir sin guardar cambios?').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.showEditar = false;
      }

    });
  }

  abrirDetalle(datos: any, indice: number, tipo: string) {
    console.log('abro el detalle del bien');
    console.log(tipo);



    this.listaImagenes = [{ imagen: '../../../../assets/imgen/casa.jpg' },
    { imagen: '../../../../assets/imgen/casa2.png' },
    { imagen: '../../../../assets/imgen/casa3.jpg' }];

    //LO IDEAL SERIA OBTENER DATOS COMPLETOS
    this.objetoDetalle = datos;
    this.indiceObjetoDetalle = indice;
    this.tipoModal = tipo;
    this.showDetalle = true;
  }

  cerrarDetalle() {
    this.showDetalle = false;
  }

  cambiarImagen(paso: number) {
    this.indiceActivoImagenes += paso;

    if (this.indiceActivoImagenes < 0) {
      this.indiceActivoImagenes = this.listaImagenes.length - 1;
    } else if (this.indiceActivoImagenes >= this.listaImagenes.length) {
      this.indiceActivoImagenes = 0;
    }
  }

  cambioAccion(accion: number) {
    this.accion = accion;
  }

  ocultarMensaje() {
    this.mostrarMensaje = false;
  }

  abrirCamvasObs(tipoAccion: boolean) {
    this.showObs = true;
    this.tipoAccion = tipoAccion;
  }

  cerrarCamvasObsConfirmar() {

    //VALIDAR CAMPO OBSERVACIONES NO ESTE VACIO
    let mensaje = this.tipoAccion ? '¿Estas seguro que quieres aprobar la opinión técnica?' : '¿Estas seguro que quieres rechazar la opinión técnica?';
    let titulomsm = this.tipoAccion ? 'Se aprobo correctamente la opinión técnica ' : 'Se rechazo correctamente la opinión técnica';
    this.confirmarModalService.abriraModal(mensaje).subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.cerrarCamvasObs();
        this.respuestaCofirmarModal.emit(true);
        this.toastrService.success(titulomsm);
      } else {
        // El usuario canceló
        //this.valorRespuestaComfirmarModal.emit(false);
      }

    });
  }

  eliminarDocumento(documento: string) {
     //VALIDAR CAMPO OBSERVACIONES NO ESTE VACIO
     this.documentoNombre = documento;
     let mensaje = `¿Estas seguro que quieres eliminar el documento ${this.documentoNombre}?`;
     let titulomsm = `Se eliminó correctamente el ${this.documentoNombre}.`;
     this.confirmarModalService.abriraModal(mensaje).subscribe(result => {
       if (result) {
         // El usuario aceptó
        //  this.cerrarCamvasObs();
         this.respuestaCofirmarModal.emit(true);
         this.toastrService.success(titulomsm);
       } else {
         // El usuario canceló
         //this.valorRespuestaComfirmarModal.emit(false);
       }

     });


  }

  cerrarCamvasObs() {
    console.log('cierro el canvas');
    this.showObs = false;
  }

  verDocumento(documentoNombre: string = '',  tipo: string) {
    console.log(documentoNombre);
    this.documentoNombre = documentoNombre;
    if (documentoNombre.includes('Oficio')) {
      this.pdfSrc = "../../../../../assets/Solicitud_Opinion_tecnica.pdf";
      this.abrarPdf();
    } else if (documentoNombre.includes('Opinión')) {
      this.pdfSrc = "../../../../../assets/opinion-tecnica.pdf";
      this.abrarPdf();
    } else {
      this.showDetalle = true;
      this.tipoModal = tipo;
    }
  }

  cargarDocumento(documentoNombre: string = '',  tipo: string) {
    this.showDetalle = true;
    this.tipoModal = tipo;
  }

  onCertFileChange(event: any){
    this.certFileName = event.target.files[0].name;
  }

  onKeyFileChange(event: any){
    this.keyFileName = event.target.files[0].name;
  }

  abrarPdf(){
    this.showPdf = true
  }

  cerrarPdf(){
    // this.descarga();
    this.showPdf = false
  }


}
