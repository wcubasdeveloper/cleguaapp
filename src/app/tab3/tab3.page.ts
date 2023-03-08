import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public nombrePersona : string;
  public perfilUsuario : string;

  constructor(
    private usuarioService : UsuarioService,
    private router: Router
    ) {
    this.nombrePersona = "";
    this.perfilUsuario = "";
  }

  ionViewWillEnter(){
    var dataUsuario = this.usuarioService.getDatosSesionUsuario();

    this.nombrePersona = dataUsuario.nombresPersona;
    this.perfilUsuario = this.getNombrePerfil(dataUsuario.codUsuarioPerfil);
  }

  cerrarSesion(){
    this.usuarioService.clearDatosSesionUsuario();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  getNombrePerfil(idUsuarioPerfil : number) : any { 
    var rpta = "";

    switch (idUsuarioPerfil) {
      case 1:
        rpta = "Vecino";
        break;
      case 2:
        rpta = "Administrador";
        break;
      case 3:
        rpta = "Policia";
        break;
      default:
        break;
    }
    return rpta;
  }

}
