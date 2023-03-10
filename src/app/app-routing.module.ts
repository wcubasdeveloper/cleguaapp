import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from '../app/Login/ingresar/ingresar.component';
import { PreRegistroComponent } from '../app/Login/Registro/pre-registro/pre-registro.component';
import { RegistroComponent } from '../app/Login/Registro/registro/registro.component';
import { RegistroJuridicaComponent } from '../app/Login/Registro/registro-juridica/registro-juridica.component';
import { SeleccionCategoriaComponent } from '../app/Paginas/inicio/vecinoVigilante/seleccion-categoria/seleccion-categoria.component';
import { RegistroDireccionComponent } from '../app/Paginas/inicio/vecinoVigilante/registro-direccion/registro-direccion.component';

import { DetalleComponent } from './tab2/Alerta/detalle/detalle.component';


const routes: Routes = [
  { path: 'login', component: IngresarComponent},
  { path: 'preregistro', component: PreRegistroComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'registrojuridica', component: RegistroJuridicaComponent},
  { path: 'seleccionarcatvecinovig/:idcategoria', component: SeleccionCategoriaComponent},
  { path: 'registrodireccion/:categoria/:idcategoria', component: RegistroDireccionComponent},
  { path: 'detallealerta', component: DetalleComponent},

  
  {
    path: 'tabinicio',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
