
import {AdminRoutingModule} from './admin-routing.module';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WizardComponent } from 'src/app/shared/wizard/wizard.component';
import { DetalleJuridicoComponent } from './juridico/detalle-juridico/detalle-juridico.component';
import { JuridicoComponent } from './juridico/juridico.component';
import { DetalleCapaComponent } from './capa/detalle-capa/detalle-capa.component';
import { CapaComponent } from './capa/capa.component';
import { AtencionesComponent } from './atenciones/atenciones.component';
import { DetalleAtencionComponent } from './etapasAtenciones/detalle/detalle-atencion/detalle-atencion.component';
import { AcreditadosComponent } from './acreditados/acreditados.component';
import { DetalleAcreditadoComponent } from './etapasAcreditados/detalle/detalle-acreditados/detalle-acreditado.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ValidacionProComponent } from './etapasPropuestas/validacion/validacionPro.component';
import { DetallePropuestaComponent } from './etapasPropuestas/detalle-solicitud/detalle-propuesta.component';
import { SiarafComponent } from './siaraf/siaraf.component';
import { DetalleSiarafComponent } from './siaraf/detalle-siaraf/detalle-siaraf.component';
import { DetalleBitacoraComponent } from './bitacora/etapasBitacoras/detalle-bitacora.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { CoperComponent } from './coper/coper.component';
import { DetalleCoperComponent } from './coper/detalle-coper/detalle-coper.component';
import { AcuerdosComponent } from './acuerdos/acuerdos.component';
import {DetalleAcuerdosComponent} from './acuerdos/detalle-acuerdos/detalle-acuerdos.component';
import { AdminArchivosComponent } from './admin-archivos/admin-archivos.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { SaedgComponent } from './saedg/saedg.component';
import { DetalleSaedgComponent } from './saedg/detalle-saedg/detalle-saedg.component';
import { SiabComponent } from './siab/siab.component';
import { DetalleSiabComponent } from './siab/detalle-siab/detalle-siab.component';
import { HistorialComponent} from './historial/historial.component';
import { DetalleRolesPerfilesComponent } from './rolesPerfiles/detalle-rolesPerfiles/detalle-rolesPerfiles.component';
import { RolesPerfilesComponent } from './rolesPerfiles/rolesPerfiles.component';
import { ReportesComponent } from './reportes/reportes.component';
import { EditarAdminComponent } from './etapasPropuestas/validacion/editar-admin/editar-admin.component';
import { AlertasComponent } from "./alertas/alertas.component";
import { AnalisisComponent } from './analisis/analisis.component';
import { DetalleAnalisisComponent } from './analisis/detalle-analisis/detalle-analisis.component';
import { ValorCoperComponent } from "./valor-coper/valor-coper.component";


/* Components */
@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe
  ],
  declarations: [
    AdminComponent,
    PropuestasComponent,
    ValidacionProComponent,
    DetallePropuestaComponent,
    BitacoraComponent,
    DetalleJuridicoComponent,
    JuridicoComponent,
    CapaComponent,
    DetalleCapaComponent,
    AcreditadosComponent,
    DetalleAcreditadoComponent,
    AtencionesComponent,
    DetalleAtencionComponent,
    SiarafComponent,
    DetalleSiarafComponent,
    DetalleBitacoraComponent,
    CatalogosComponent,
    CoperComponent,
    DetalleCoperComponent,
    AcuerdosComponent,
    DetalleAcuerdosComponent,
    AdminArchivosComponent,
    AdministracionComponent,
    SaedgComponent,
    DetalleSaedgComponent,
    SiabComponent,
    DetalleSiabComponent,
    HistorialComponent,
    DetalleRolesPerfilesComponent,
    RolesPerfilesComponent,
    ReportesComponent,
    EditarAdminComponent,
    AlertasComponent,
    AnalisisComponent,
    DetalleAnalisisComponent,
    ValorCoperComponent
  ],
  exports: [
    WizardComponent,
    DetalleAtencionComponent,
    DetalleAcreditadoComponent,
  ],

})
export class AdminModule {
}
