import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from  './../../environments/environment';
import { Observable } from 'rxjs';
import { IloginModel} from '../Modelos/ilogin-model';
import { UsuarioService } from '../services/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient, private usuarioService : UsuarioService) { }

  registrarAlerta(dataRequest : any) {
    const body = {
      // "action": "registro_alerta",
      "idCategoria":dataRequest.idCategoria,
      "idUsuarioRegistro":dataRequest.idUsuarioRegistro,
      "subCategoria":dataRequest.subCategoria,
      "direccionAlerta":dataRequest.direccionAlerta, 
      "direccionReferencia":dataRequest.direccionReferencia, 
      "latitud":dataRequest.latitud, 
      "longitud":dataRequest.longitud, 
      //"nombreFotoArr":dataRequest.nombreFotoArr, 
      "descripcionAlerta":dataRequest.descripcionAlerta, 
      //"nombreAudio":dataRequest.nombreAudio,
      "contentType": dataRequest.contentType,
      "extensionimg": dataRequest.extensionimg,
      "base64Data": dataRequest.base64Data,
      "esAnonimo" : dataRequest.esAnonimo
    };

    //return this.http.post(environment.baseUrlServicio +(!isproduccion ? 'api/App/RegistraAlerta/' : ''), body);
    //return this.http.post(environment.baseUrlServicio +'api/App/RegistraAlerta/', body);

    let HOST_API = this.usuarioService.getHostAPI() + '/apiclegua/';

    return this.http.post(HOST_API +'api/App/RegistraAlerta/', body);


  }

  listaAlertaPorUsuario(idUsuario : number) {
    const body = {
      "idUsuario":idUsuario
    };
    //return this.http.post(environment.baseUrlServicio +(!isproduccion ? 'api/App/RegistraAlerta/' : ''), body);
    //return this.http.post(environment.baseUrlServicio +'api/App/RegistraAlerta/', body);
    let HOST_API = this.usuarioService.getHostAPI() + '/apiclegua/';
    return this.http.post(HOST_API +'api/App/ListaAlertaPorUsuario/', body);
  }

  atenderAlerta(dataAtencion : any) {
    const body = {
      "idRegistroAtencion":dataAtencion.idRegistroAtencion,
      "idUsuarioAtencion" : dataAtencion.idUsuarioAtencion,
      "descripcionAtencion" : dataAtencion.descripcionAtencion,
      "base64ImgAtencion" : dataAtencion.base64ImgAtencion,
      "mimetype" : dataAtencion.mimetype,
      "extension" : dataAtencion.extension
    };
    //return this.http.post(environment.baseUrlServicio +(!isproduccion ? 'api/App/RegistraAlerta/' : ''), body);
    //return this.http.post(environment.baseUrlServicio +'api/App/RegistraAlerta/', body);
    let HOST_API = this.usuarioService.getHostAPI() + '/apiclegua/';
    return this.http.post(HOST_API +'api/App/AtenderAlerta/', body);
  }


}
