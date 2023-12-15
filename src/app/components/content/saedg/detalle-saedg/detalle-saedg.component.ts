import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-detalle-saedg',
  templateUrl: './detalle-saedg.component.html',
  styleUrls: ['./detalle-saedg.component.scss']
})
export class DetalleSaedgComponent {
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';

  Acciondetalle: number = 1;
  Datosdocumentos: any[] = [
    {
      Nombredoc: 'Acta'
    },
    {
      Nombredoc: 'CURP'
    },
    {
      Nombredoc: 'Identificación Oficial'
    }
  ];

  Documentonombre: string = '';
  Showdetalle: boolean = false;
  Showcargadocumento: boolean = false;
  Showgeneraroficio: boolean = false;
  Showagregardocumento: boolean = false;
  Prevdocumento: boolean = false;
  Prevanexo: boolean = false;
  Documentofilename: string = "Ubicación del documento";
  Pdfsrc: string = '';
  Showagregaranexo: boolean = false;
  Showsustituiranexo: boolean = false;
  Anexofilename: string = "Ubicación del anexo";
  Pdfsrcanexo: string = '';
  
  

  constructor(
    private toastrService : ToastrService,    
  ) {
  }

  Abrirpdf(Documentonombre: string = '') {
    this.Documentonombre = Documentonombre;
    this.Showdetalle = true;
  }
  Cargardocumento(Documentonombre: string = '', accion: string) {
    this.Documentonombre = Documentonombre
    this.Showcargadocumento = true;
  }

  Cambioacciondetalle(accion : number) {
    this.Acciondetalle = accion;
  }


  Generaroficio() {
    this.Showgeneraroficio = true;
  }
  
  Cerrarcanvas(tipo: string) {
    switch (tipo) {
      case 'oficio':
        this.Showgeneraroficio = false;
        break;
      case 'documento':
        this.Showagregardocumento = false;
        break;    
      case 'Prevdocumento':
        this.Prevdocumento = false;
        break;
      case 'Prevanexo':
        this.Prevanexo = false;
        break;
      case 'Showagregaranexo':
        this.Showagregaranexo = false;
        break;
      case 'Showsustituiranexo':
        this.Showsustituiranexo = false;
        break;
      default:
        break;
    }
  }
  Guardaroficio() {
    this.toastrService.success('Se ha guardado exitosamente el oficio.')
    this.Showgeneraroficio = false;
  } 
  Subirdocumento(event: any) {
    const Archivoseleccionado = event.target.files[0];

    if (Archivoseleccionado) {
      // Simulamos la carga del documento añadiéndolo al arreglo
      this.Datosdocumentos.push({
        nombreDoc: Archivoseleccionado.name,
      });

      // Limpiamos el input de tipo file después de la carga
      event.target.value = '';

      console.log('Documento cargado:', Archivoseleccionado.name);
    }
  }
  Agregardocumento() {
    this.Showagregardocumento = true;
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none'; 
    input.onchange = (event: any) => {
      const Archivoseleccionado = event.target.files[0];
      if (Archivoseleccionado) {
        this.Datosdocumentos.push({
          nombreDoc: Archivoseleccionado.name
        });

        console.log('Documento agregado:', Archivoseleccionado.name);
        
      }
    }

  }
  
  Ondocumentofilechange(event: any){
    this.Documentofilename = event.target.files[0].name;
  }

  Guardardocumento() {
    this.toastrService.success('Se ha guardado exitosamente el documento.')
    this.Showagregardocumento = false;
  }



  Openvistapreviadocumento(Documentonombre: string = '',  tipo: string) {
    this.Documentonombre = Documentonombre;
    if (Documentonombre.includes('documento')) {
      this.Pdfsrc = "../../../../../assets/nombre.pdf";
      this.Abrirpdfdocumento();
    }
  }

  Abrirpdfdocumento() {
    this.Prevdocumento = true;
  }

  Descargaranexo() {
    const downloadLink = document.createElement('a');
    const fileName = 'ejemploAnexo.pdf';
    downloadLink.href = this.Pdfsrc;
    downloadLink.download = fileName;
    downloadLink.click();
    this.toastrService.success('Se ha descargado correctamente el Anexo.')
  }

  Agregaranexo() {
    this.Showagregaranexo = true;
  }


  Guardaranexo(cadena: string) {

    if (cadena == 'guardarAnexo') {
      this.toastrService.success('Se ha guardado exitosamente el anexo.')
      this.Showagregaranexo = false;
    } else {
      this.toastrService.success('Se ha guardado exitosamente el anexo.')
      this.Showsustituiranexo = false;
    }
  }

  Sustituiranexo() {
    this.Showsustituiranexo = true;
  }

  Onanexofilechange(event: any) {    
    this.Anexofilename = event.target.files[0].name;
    this.Pdfsrcanexo = "../../../../../assets/anexo.pdf";      
    this.Mostrarpdfanexo()
  }

  Mostrarpdfanexo() {
    this.Pdfsrcanexo = "../../../../../assets/nombre.pdf";
  }


}
