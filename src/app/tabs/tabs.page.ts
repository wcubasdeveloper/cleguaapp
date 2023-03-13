import { Component } from '@angular/core';
import  {  UsuarioService} from './../services/usuario.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public datausuario : any;
  constructor(
    private usuarioService: UsuarioService
    ) {

      this.datausuario = usuarioService.getDatosSesionUsuario();
      // console.log("en TABS-",dataUsuario);

    }


  // ionViewWillEnter(){
  //   this.datausuario = this.usuarioService.getDatosSesionUsuario();

  // }

}
