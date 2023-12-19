import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalService } from 'src/app/services/confirmar-modal/confirmar-modal.service';
import { Bienes } from './datos-bienes';

@Component({
  selector: 'sg-detalle-siab',
  templateUrl: './detalle-siab.component.html',
  styleUrls: ['./detalle-siab.component.scss']
})
export class DetalleSiabComponent {
  @Input() id_solicitud: number = 0;
  @Input() solicitante: string = '';
  tipoVista: boolean = true;
  listaBienes:any[] = [];
  listaImagenes:any[] = [];
  objetoDetalle:any = {};
  indiceObjetoDetalle:any = {};
  accionBien:boolean = true;
  showDetalle:boolean = false;
  listaBienesSeleccionados:any[] = [];
  showEditar:boolean = false;
  indiceActivoImagenes = 0;
  mostrarMensaje:boolean = true;
  accion:number = 1; // accion de edicion


  constructor(
    public toastrService: ToastrService, private confirmarModalService: ConfirmarModalService,){
}
  

  buscarBienes(){
    this.listaBienes = Bienes;
  }

  abrirDetalle(datos:any, indice:number, tipo:boolean){

    this.listaImagenes = [{imagen:'../../../../assets/imgen/casa.jpg'},
                          {imagen:'../../../../assets/imgen/casa2.png'},
                          {imagen:'../../../../assets/imgen/casa3.jpg'}];

     //LO IDEAL SERIA OBTENER DATOS COMPLETOS
    this.objetoDetalle = datos;
    this.indiceObjetoDetalle = indice;
    this.accionBien = tipo;

    this.showDetalle = true;
  }

  asignarBien(){
    this.listaBienes.splice(this.indiceObjetoDetalle, 1);
    this.listaBienesSeleccionados.push(this.objetoDetalle);
    this.cerrarDetalle();
  }

  cerrarDetalle(){
    this.showDetalle = false;
  }

  quitarBien(){
    this.listaBienesSeleccionados.splice(this.indiceObjetoDetalle, 1);
    this.listaBienes.push(this.objetoDetalle);
    this.cerrarDetalle();
  }
  
  cambiarImagen(paso: number) {
    this.indiceActivoImagenes += paso;

    if (this.indiceActivoImagenes < 0) {
      this.indiceActivoImagenes = this.listaImagenes.length - 1;
    } else if (this.indiceActivoImagenes >= this.listaImagenes.length) {
      this.indiceActivoImagenes = 0;
    }
  }

  guardarSeleccionBien(){
    this.showEditar = false;
    this.toastrService.success("Se guardarón correctamente los bienes");

  }
  ocultarMensaje(){
    this.mostrarMensaje = false;
  }
 
  cambioAccion(accion:number){
    this.accion = accion;
  }

  cerrarEditar(){
    this.confirmarModalService.abriraModal('¿Seguro quieres salir sin guardar cambios?').subscribe(result => {
      if (result) {
        // El usuario aceptó
        this.showEditar = false;
      }

    });
  }

}
  

