import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seleccion-categoria',
  templateUrl: './seleccion-categoria.component.html',
  styleUrls: ['./seleccion-categoria.component.scss'],
})
export class SeleccionCategoriaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  regresar(){
    this.router.navigateByUrl('tabinicio', { replaceUrl: true });

  }

  registrarReporte(tipoReporte : string){
    this.router.navigateByUrl('registrodireccion', { replaceUrl: true });

    
  }
  
}
