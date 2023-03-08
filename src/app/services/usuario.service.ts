import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from  './../../environments/environment';
import { IloginModel} from '../Modelos/ilogin-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  // registrarUsuario(data :any): Observable<any>{

  //   return this.http.post<any>( 
  //     environment.baseUrlServicio + 'TaxiConductorService/ATTRecuperaClave/?claveServicio='+ 
  //     environment.claveService +'&usuario='+ data.usuario , ''
  //     ).pipe(tap(
  //       (res: any) =>{
        
  //       }
  //     ));
  // }

  loginUsuario(dataRequest : any) {
      const body = {
          "usuario": dataRequest.usuario,  
          "clave": dataRequest.clave
      };
      //return this.http.post(environment.baseUrlServicio +(!isproduccion ? 'api/App/LoginUsuario/' : ''), body);
      //return this.http.post(environment.baseUrlServicio + 'api/App/LoginUsuario/', body);
      let HOST_API = this.getHostAPI() + '/apiclegua/';

      return this.http.post(HOST_API + 'api/App/LoginUsuario/', body);

      // return this.http.post(HOST_API + 'api/App/LoginUsuario/', body)
      // .pipe(
      //   catchError(this.handleError)
      // );
  }


  
  registrarUsuario(dataRequest : any) {
    const body = {
        "idTipoPersona": dataRequest.idTipoPersona,  
        "idTipoDocumento": dataRequest.idTipoDocumento, 
        "nroDocumento": dataRequest.nroDocumento,  
        "digitoVerifica": dataRequest.digitoVerifica, 
        "fechaEmision": dataRequest.fechaEmision,  
        "nombres": dataRequest.nombres, 
        "apepat": dataRequest.apepat,  
        "apemat": dataRequest.apemat, 
        "email": dataRequest.email, 
        "celularm": dataRequest.celularm, 
        "telefono": dataRequest.telefono, 
        "clave":dataRequest.clave, 
        "ruc": dataRequest.ruc, 
        "razonSocial": dataRequest.razonSocial, 
        "direccionEmpresa": dataRequest.direccionEmpresa, 
    };
    
    //return this.http.post(environment.baseUrlServicio +(!isproduccion ? 'api/App/RegistroUsuario/' : ''), body);

    ///return this.http.post(environment.baseUrlServicio +'api/App/RegistroUsuario/' , body);
    let HOST_API = this.getHostAPI() + '/apiclegua/';

    return this.http.post(HOST_API +'api/App/RegistroUsuario/' , body);


  }

  
  getDatosSesionUsuario(): IloginModel{

    let datosPasajero: any;
        datosPasajero = localStorage.getItem("datosUsuarioLoginapp");
    if( datosPasajero == null || datosPasajero == undefined ){
        datosPasajero = null;
    }else{
      let datos = JSON.parse(datosPasajero);
      datosPasajero = datos;
    }

    return datosPasajero;
  }

  clearDatosSesionUsuario(){
    localStorage.removeItem('datosUsuarioLoginapp')
  }

  setDatosSesionPasajero(usuarioData : any): void {
    //
    let datosPasajero : IloginModel = {
      idusuario : usuarioData.idusuario,
      nombreUsuario : usuarioData.nombreUsuario,
      codUsuarioPerfil : usuarioData.codUsuarioPerfil,
      nombresPersona: usuarioData.nombresPersona
    }

    localStorage.setItem("datosUsuarioLoginapp", JSON.stringify(datosPasajero));
  }


  //DATOS PARA URL 
  setHostAPI(url : string): void {
    this.clearDatosHostAPI();
    localStorage.setItem("urlhostbase", url);
  }

  clearDatosHostAPI(){
    localStorage.removeItem('urlhostbase');
  }

  getHostAPI(): any {
    let host_api = localStorage.getItem("urlhostbase");
    return host_api;
  }
}


