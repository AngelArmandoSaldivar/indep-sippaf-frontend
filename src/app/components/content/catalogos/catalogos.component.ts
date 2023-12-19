import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CatalogosService } from 'src/app/services/catalogos/catalogos.service';
import { ToastrService } from 'ngx-toastr';
import { INTERNAL_CODES } from 'src/app/shared/constantes/constantes';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { catalogoEstado } from 'src/app/models/datosCatalogo.model';
//import {listaCatalogos} from './listaCatalogos'

@Component({
  selector: 'sg-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent {
    showAgregarCatalogo: boolean = false;
    listaCatalogos:any[]=[];
    showCatalogos:boolean=false;
    showCamvasPrincipal:boolean=false;
    Seleccionado:number=0;
    catalogoSeleccionado: string = '';
    listaRegistros:any[] = [];
    showEditarCatalogo:boolean=false;

  propiedades:any;

  tituloModal: string = 'Nuevo Estado';
  preguntaEliminar: string = '';

  FormularioModal!: FormGroup;
  FormularioBusqueda!: FormGroup;

  mostrarSpenner: boolean = false;
  esActualizacion: boolean = false;

  noPageActual: number = 1;
  itemsPageActual: number = 10;

  registroAEliminar!: catalogoEstado;

  constructor(
    private CatalogosService: CatalogosService,
    private modal: NgbModal,
    private config: NgbModalConfig,
    private fb: FormBuilder,
    public toastrService: ToastrService,
    private confirmarModalService: ConfirmarModalService,
  ){
    config.backdrop = 'static';
    config.keyboard = false;

    this.Seleccionado = 0;
    this.listaCatalogos =
    [
        { idCatalogo: 0, descripcion: 'Selecciona', activo: false},
        { idCatalogo: 1, descripcion: 'Motivo llamada', activo: false },
        { idCatalogo: 2, descripcion: 'Grupo económico', activo: false },
        { idCatalogo: 3, descripcion: 'Estatus propuesta', activo: false },
        { idCatalogo: 4, descripcion: 'Organización social', activo: false },
        { idCatalogo: 5, descripcion: 'Número de póliza', activo: false },
        { idCatalogo: 6, descripcion: 'Remitentes', activo: false },
        { idCatalogo: 7, descripcion: 'Unidades administrativas', activo: false },
    ]
  }



  abrirCamvasPrincipal(datos: any) {
    this.showCamvasPrincipal = true;
    
  }
  agregarCatalogo() {
    this.showAgregarCatalogo = true;
  }
  guadarArchivo() {
    this.toastrService.success('Se ha guardado exitosamente el nuevo registro.')
    this.showAgregarCatalogo = false;
  }
  EditarCatalogo() {
    this.showEditarCatalogo = true;
  }
  actualizarcatalogo() {
    this.toastrService.success('Se ha actualizado exitosamente el registro.')
    this.showEditarCatalogo = false;
  }

  Elimimarcatalogo() {
    this.confirmarModalService.abriraModal('¿Esta seguro de querer eliminar este registro?').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.showCamvasPrincipal = false;
        this.toastrService.success("Se ha eliminado exitosamente el registro.");
  
      }

    });
   // this.showEditar = false;
   // this.toastrService.success("Se guardó correctamente la prevalidación");
  
  }
 
  cerrarOffCanvas( numero: number) {
    switch (numero) {
    case 1:
        this.showAgregarCatalogo = false;
        break;
    case 2:
        this.showEditarCatalogo = false;
        break;

      default:
        break;
    }
  }
  cambioSeleccion(num:number){
    this.Seleccionado = num;
    this.listaCatalogos.forEach(solicitud => {
      solicitud.activo = false;
    });
    this.listaCatalogos.forEach(solicitud => {
      if (solicitud.idCatalogo == num) {
        solicitud.activo = true;
      }
    });
  
 
    if(this.Seleccionado==1){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Motivo llamada 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Motivo llamada 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Motivo llamada 3'
      }
    ];
    }
    if(this.Seleccionado==2){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Grupo económico 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Grupo económico 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Grupo económico 3'
      }
    ];
    }
    if(this.Seleccionado==3){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Estatus propuesta 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Estatus propuesta 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Estatus propuesta 3'
      }
    ];
    }
    if(this.Seleccionado==4){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Organización social 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Organización social 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Organización social 3'
      }
    ];
    }
    if(this.Seleccionado==5){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Número de póliza 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Número de póliza 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Número de póliza 3'
      }
    ];
    }
    if(this.Seleccionado==6){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Remitentes 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Remitentes 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Remitentes 3'
      }
    ];
    }
    if(this.Seleccionado==7){
      this.listaRegistros = [
        {
          idRegistro:'001',
          descripcionReg:'Unidades administrativas 1'
      },
      {
          idRegistro:'002',
          descripcionReg:'Unidades administrativas 2'
      },
      {
          idRegistro:'003',
          descripcionReg:'Unidades administrativas 3'
      }
    ];
    }
  }

}