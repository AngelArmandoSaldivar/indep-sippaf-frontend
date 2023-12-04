import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-detalle-saeog',
  templateUrl: './detalle-saeog.component.html',
  styleUrls: ['./detalle-saeog.component.scss']
})
export class DetalleSaeogComponent {
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';

  accionDetalle: number = 1;
  datosDocumentos: any[] = [
    {
      nombreDoc: 'Acta'
    },
    {
      nombreDoc: 'CURP'
    },
    {
      nombreDoc: 'Identificacion Oficial'
    }
  ];

  documentoNombre: string = '';
  showDetalle: boolean = false;
  showCargaDocumento:boolean = false;
  showGenerarOficio: boolean = false;
  showAgregarDocumento:  boolean = false;
  prevDocumento: boolean = false;
  prevAnexo: boolean = false;
  documentoFileName: string = "Ubicación del documento";
  

  constructor(
    private toastrService : ToastrService,    
  ) {
  }

  abrirPdf(documentoNombre: string = '') {
    this.documentoNombre = documentoNombre;
    this.showDetalle = true;
  }
  cargarDocumento(documentoNombre: string = '', accion: string) {
    this.documentoNombre = documentoNombre
    this.showCargaDocumento = true;
  }

  cambioAccionDetalle(accion : number) {
    this.accionDetalle = accion;
  }


  descargarDocumento(nombreDocumento: string): void {
    
    const url = this.construirUrlDelDocumento(nombreDocumento);
  
    if (url) {
      
      saveAs(url, `${nombreDocumento}.pdf`);
    } else {
      console.warn('La URL del documento no está definida.');
    }
  }

  activarInputFile(){
    this.inputFile.nativeElement.click();
  }

  manejarCambioArchivo(event: any){
    const archivoSeleccionado = event.target.files[0];

    if (archivoSeleccionado) {
      this.datosDocumentos.push({
        nombreDoc: archivoSeleccionado.name,
      });

      console.log('Documento agregado:', archivoSeleccionado.name);
      
    }
    this.inputFile.nativeElement.value = '';
  }

  private construirUrlDelDocumento(nombreDocumento: string): string | null {
    // Aquí debes implementar la lógica para construir la URL del documento según tus necesidades.
    // Esto podría ser una llamada a un servicio que genera la URL del documento.
    // En este ejemplo, solo devolvemos null.
    return null;
  }

  generarOficio() {
    this.showGenerarOficio = true;
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
      default:
        break;
    }
  }
  guardarOficio() {
    this.toastrService.success('Se ha guardado exitosamente el oficio.')
    this.showGenerarOficio = false;
  } 
  subirDocumento(event: any) {
    const archivoSeleccionado = event.target.files[0];

    if (archivoSeleccionado) {
      // Simulamos la carga del documento añadiéndolo al arreglo
      this.datosDocumentos.push({
        nombreDoc: archivoSeleccionado.name,
      });

      // Limpiamos el input de tipo file después de la carga
      event.target.value = '';

      console.log('Documento cargado:', archivoSeleccionado.name);
    }
  }
  agregarDocumento() {
    this.showAgregarDocumento = true;
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none'; 
    input.onchange = (event: any) => {
      const archivoSeleccionado = event.target.files[0];
      if (archivoSeleccionado) {
        this.datosDocumentos.push({
          nombreDoc: archivoSeleccionado.name
        });

        console.log('Documento agregado:', archivoSeleccionado.name);
        
      }
    }

  }
  
  onDocumentoFileChange(event: any){
    this.documentoFileName = event.target.files[0].name;
  }

  guardarDocumento() {
    this.toastrService.success('Se ha guardado exitosamente el documento.')
    this.showAgregarDocumento = false;
  }

  guardarDocumentos() {
    this.toastrService.success("Se ha guardado exitosamente el documento.")
    console.log('Documentos guardados:', this.datosDocumentos);
  }

  completarTarea() {
    this.toastrService.success("Se ha completado la tarea exitosamente")
    console.log('Tarea completada');
  }


}



