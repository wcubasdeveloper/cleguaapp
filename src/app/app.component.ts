import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService} from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private usuarioService : UsuarioService

  ) {
    this.initializeApp();
  }

  initializeApp(){
    var estaLogeado = this.usuarioService.getDatosSesionUsuario() ? true: false;
    

    this.platform.ready().then(()=>{  
      //console.log("inició el app");
      if(estaLogeado){
        this.router.navigateByUrl('tabinicio', { replaceUrl: true });
      }else{
        this.router.navigateByUrl('login', { replaceUrl: true });
      }

    })
  }
}
