import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'sg-detalle-siaraf',
  templateUrl: './detalle-siaraf.component.html',
  styleUrls: ['./detalle-siaraf.component.scss']
})
export class DetalleSiarafComponent {
  @Input() tipo: number = 0;
  @Input() id_solicitud: number = 0;
  @Input() solicitante = '';

  




  Tipovista: boolean = true;
  Showcamvasprincipal: boolean = false;


  Datossiaraf: any[] = [
    {
      cliente: 'Martín Reyes',
      sucursal: 'CDMX',
      fecha: '05/08/2022',
      capV: 'SI',
      saldo: '$5,385.24'
    },
    {
      cliente: 'Pedro Sereno',
      sucursal: 'Cueramaro',
      fecha: '25/04/2023',
      capV: 'SI',
      saldo: '$85,578.04'
    },
    {
      cliente: 'Ángel Costilla',
      sucursal: 'San Pedro',
      fecha: '15/08/2021',
      capV: 'NO',
      saldo: '$3,257.25'
    }
  ];

}
