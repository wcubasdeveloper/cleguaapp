import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule y Routes
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresarComponent } from './Login/ingresar/ingresar.component';
import { AuxilioRapidoComponent } from './Paginas/auxilio-rapido/auxilio-rapido.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';


import { ChatComponent} from './Paginas/ContactoLinea/chat/chat.component';
import { SolicitaCitaComponent} from './Paginas/ContactoLinea/solicita-cita/solicita-cita.component';
import { PreRegistroComponent} from './Login/Registro/pre-registro/pre-registro.component'; 
import { RegistroComponent} from './Login/Registro/registro/registro.component'; 
import { RegistroJuridicaComponent} from './Login/Registro/registro-juridica/registro-juridica.component'; 

import { SeleccionCategoriaComponent} from './Paginas/inicio/vecinoVigilante/seleccion-categoria/seleccion-categoria.component'; 
import { RegistroDireccionComponent} from './Paginas/inicio/vecinoVigilante/registro-direccion/registro-direccion.component'; 
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";




@NgModule({
  declarations: [
    AppComponent, 
    IngresarComponent,
    AuxilioRapidoComponent,
    ChatComponent,
    SolicitaCitaComponent,
    PreRegistroComponent,
    RegistroComponent,
    RegistroJuridicaComponent,
    SeleccionCategoriaComponent,
    RegistroDireccionComponent
  ],
  // imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    IonicInputMaskModule
  ], // incluir IonicModule en imports

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CallNumber],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agregar aquí el CUSTOM_ELEMENTS_SCHEMA

})
export class AppModule {}
