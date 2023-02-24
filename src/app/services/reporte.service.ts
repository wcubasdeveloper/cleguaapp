import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from  './../../environments/environment';
import { Observable } from 'rxjs';
import { IloginModel} from '../Modelos/ilogin-model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  registrarAlerta(dataRequest : any) {
    const body = {
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
      "base64Data": dataRequest.base64Data
    };

    return this.http.post(environment.baseUrlServicio +'api/App/RegistraAlerta/', body);
  }
}
