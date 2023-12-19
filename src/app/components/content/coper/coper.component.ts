import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';

@Component({
  // imports: [NgbDropdownModule, AdminModule, CommonModule, FormsModule, ReactiveFormsModule, PdfViewerModule],
  // standalone: true,
  selector: 'sg-coper',
  templateUrl: './coper.component.html',
  styleUrls: ['./coper.component.scss'],
})
export class CoperComponent {
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


  cambioAccionDetalle(accion: number) {
    this.accionDetalle = accion;
  }

  //#################################################################################

  cambioAccion(accion: number) {
    this.accion = accion;
  }
}
