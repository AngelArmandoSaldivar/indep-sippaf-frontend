import { Component } from '@angular/core';
import { Dataarchivos, Dataseccion, Datafiles } from './dataDummyArchivos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-admin-archivos',
  templateUrl: './admin-archivos.component.html',
  styleUrls: ['./admin-archivos.component.scss']
})
export class AdminArchivosComponent {
  Seccion: string = 'Elige una opción';
  Secciones = Dataseccion;

  Archivo: string = 'Elige una opción';
  Archivos: any = Datafiles;

  Datatablaarchivos = Dataarchivos;

  Showagregararchivo: boolean = false;

  Mostrartabla: boolean = false;


  constructor(
    private toastrService : ToastrService,
  ) {}
  Changeseccion() {}

  Changesubseccion() {}

  Changearchivos() {}

  Busquedaarchivos() {
    this.Mostrartabla = true;
  }

  Agregararchivo() {
    this.Showagregararchivo = true;
  }

  Cerraroffcanvas( numero: number) {
    switch (numero) {
      case 1:
        this.Showagregararchivo = false;
        break;
    
      default:
        break;
    }

    
  }

  Guardararchivo() {
    this.toastrService.success('Se ha guardado exitosamente el nuevo archivo')
    this.Showagregararchivo = false;
  }
  

}
