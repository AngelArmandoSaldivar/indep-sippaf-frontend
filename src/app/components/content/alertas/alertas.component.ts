import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { CONSTANTES } from 'src/app/shared/constantes/constantes';
import { dataAlerta } from "./dataAlertas";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss'],
})
export class AlertasComponent {
    datosAlertas: any 
    nombreAlerta: string = '';
    tiempoAlerta: string ='';
    estatusAlerta: string = '';
    showEditarAlerta: boolean = false;
   

    constructor(
        public toastrService: ToastrService
    ){
        this.datosAlertas = [
            {
              id: 1,
              nombre: 'Nueva Asignación',
              tiempo: '0 días',
              estatus: 'Activo',
            },
            {
              id: 2,
              nombre: 'Aviso de 30 días',
              tiempo: '30 días',
              estatus: 'Activo',
            },
            {
              id: 3,
              nombre: 'Aviso 50 días',
              tiempo: '50 días',
              estatus: 'Inactivo',
            },
            {
              id: 4,
              nombre: 'Aviso 60 días',
              tiempo: '90 días',
              estatus: 'Activo',
            }
          ];
    }


    dataAlertas = dataAlerta;

    editarAlerta(nombre: string, tiempo: string, estatus: string) {
        this.nombreAlerta = nombre;
        this.tiempoAlerta = tiempo;
        this.estatusAlerta = estatus;
        this.showEditarAlerta = true  
        
      }


      guardar() {
        this.toastrService.success('Cambios guardados');
        this.cerrarCanvas();
      }
      cerrarCanvas() {
        this.showEditarAlerta = false;
      }

      changeSubseccion() {}


  
}
