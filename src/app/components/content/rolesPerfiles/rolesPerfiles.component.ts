import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';
import { dataPerfil } from './dataPerfiles';

@Component({
  // imports: [NgbDropdownModule, AdminModule, CommonModule, FormsModule, ReactiveFormsModule, PdfViewerModule],
  // standalone: true,
  selector: 'sg-rolesPerfiles',
  templateUrl: './rolesPerfiles.component.html',
  styleUrls: ['./rolesPerfiles.component.scss'],
})
export class RolesPerfilesComponent {
  tipoVista: boolean = false;
  Seleccionado: number = 0;
  showEditPerfilRol: boolean = false;
  listaDatos: any[] = [];
  nombrePerfil: string = 'Hola';
  isDisplay = false;

  constructor(
    public toastrService: ToastrService
  ) {       
    
  }

  dataPerfiles = dataPerfil;

  changeSubseccion() {}

  cambioSeleccion(num: number) {
    this.Seleccionado = num;
    this.tipoVista = true;

    this.listaDatos = [{
      id: 1, 
      usuario: 'agonzalezj',
      nombre: 'Alfonso Gonzalez J',
      estatus: 'Activo',
      estatusAD: 'Activo',
      perfil: 'Administrador'
    },
    {
      id: 1, 
      usuario: 'xhernandexc',
      nombre: 'Ximena Hernández C',
      estatus: 'Activo',
      estatusAD: 'Activo',
      perfil: 'Coordinador'
    },
    {
      id: 1, 
      usuario: 'jjaimest',
      nombre: 'Javier Jaimes T',
      estatus: 'Inactivo',
      estatusAD: 'Activo',
      perfil: 'Especialista'
    }]
  }

  editarRolPerfil(nombre: string) {
    this.nombrePerfil = nombre;
    this.showEditPerfilRol = true  
  }
  guardar() {
    this.toastrService.success('Se ha guardado correctamente el perfil.');
    this.cerrarCanvas();
  }
  cerrarCanvas() {
    this.showEditPerfilRol = false;
  }
}
