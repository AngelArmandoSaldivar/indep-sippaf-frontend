import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProlongaSesionComponent } from './shared/prolonga-sesion/prolonga-sesion.component';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './services/interceptors/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    ProlongaSesionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NgbModule,
    NgbProgressbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // positionClass: 'toast-right',
      preventDuplicates: true,
      progressBar: true,
    }),

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
