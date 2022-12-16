import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresarComponent } from './Login/ingresar/ingresar.component';
import { AuxilioRapidoComponent } from './Paginas/auxilio-rapido/auxilio-rapido.component';
import { InicioComponent} from './Paginas/ContactoLinea/inicio/inicio.component';


import { ChatComponent} from './Paginas/ContactoLinea/chat/chat.component';
import { SolicitaCitaComponent} from './Paginas/ContactoLinea/solicita-cita/solicita-cita.component';

@NgModule({
  declarations: [
    AppComponent, 
    IngresarComponent,
    AuxilioRapidoComponent,
    InicioComponent,
    ChatComponent,
    SolicitaCitaComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
