import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dataCartera, tiposDemandado, VALOR } from './dataAnalisis';

@Component({
  selector: 'sg-detalle-analisis',
  templateUrl: './detalle-analisis.component.html',
  styleUrls: ['./detalle-analisis.component.scss']
})
export class DetalleAnalisisComponent {
  @Input() tipo: number = 0;
  @Input() id_analisis: number = 0;
  @Input() solicitante = '';  


  tipoVista: boolean = true;
  showCamvasPrincipal: boolean = false;
  carteras = dataCartera;
  montoPendiente: number = 0;
  tipoCarteraId: number = 0;
  inputDemandado: boolean = false;
  resultadoCalculo: string = '';
  btnCalcular: boolean = true;
  inputGastos: boolean = false;
  tipoDemandado: number = 0;
  dataDemandado = tiposDemandado;
  cardResultado: boolean = true;
  inputMontoPendiente: boolean = true;
  gastos: number = 0;

  changeSubseccion(event: any) {
       
    this.tipoCarteraId = event.target.value;    

    if (this.tipoCarteraId == 1) {
      this.montoPendiente = this.carteras[0].montoPendiente;
      this.inputDemandado = false;
      this.btnCalcular = true;      
      this.inputGastos = true;
      this.inputMontoPendiente = true;
      this.resultadoCalculo = '';
    } else if (this.tipoCarteraId == 2) {
      this.inputDemandado = true;
      //this.montoPendiente = this.carteras[1].montoPendiente;
      this.btnCalcular = false;
      this.inputGastos = false;            
      this.inputMontoPendiente = true;
      this.resultadoCalculo = '';
    } 
    /*else {
      this.montoPendiente = this.carteras[2].montoPendiente;
      this.inputMontoPendiente = true;
      this.resultadoCalculo = '';
    }*/
    
  }

  changeSubseccionDemandado(event: any) {

    this.tipoDemandado = event.target.value;    

    if (this.tipoDemandado == 1) {
      
      this.inputGastos = false;
      this.btnCalcular = false;
      this.inputMontoPendiente = true;
      this.montoPendiente = this.dataDemandado[0].montoPendiente;

      this.calcular(this.montoPendiente, 0);

      
    } else if(this.tipoDemandado == 2) {

      this.inputGastos = true;      
      this.btnCalcular = true;  
      this.inputMontoPendiente = true;
      this.resultadoCalculo = '';
      this.montoPendiente = this.dataDemandado[1].montoPendiente;
      //this.calcular();

    } 
    else {

      this.inputMontoPendiente = false;
      this.inputGastos = false;
      this.btnCalcular = false;
      this.calcular(this.dataDemandado[2].montoPendiente, 0);
    }

  }

  calcular(montoPen: number, gast: number) {

    console.log("GASTO: " + gast);
    console.log("MONTO PENDIENTE: " + montoPen);
    
    

    var calculo = montoPen - gast;

    if (calculo >= VALOR) {
      this.cardResultado = true;
      this.resultadoCalculo = 'Presentar a COPER.';
    } else {
      this.cardResultado = true;
      this.resultadoCalculo = 'No procede.';
    }

  }

  agenda() {

  }

}
