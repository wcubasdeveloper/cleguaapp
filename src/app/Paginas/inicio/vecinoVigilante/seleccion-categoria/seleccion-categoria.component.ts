import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // Importar el servicio ActivatedRoute


@Component({
  selector: 'app-seleccion-categoria',
  templateUrl: './seleccion-categoria.component.html',
  styleUrls: ['./seleccion-categoria.component.scss'],
})
export class SeleccionCategoriaComponent implements OnInit {

  idCategoriaSeleccionada : string

  constructor(private router: Router,private activatedRoute :ActivatedRoute) {
    this.idCategoriaSeleccionada = "";
   }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.idCategoriaSeleccionada =  params['idcategoria'];
      console.log("idcategoria seleccionada--", this.idCategoriaSeleccionada )
     //let placabusqueda = params['placabusqueda'];
    })

  }

  regresar(){
    this.router.navigateByUrl('tabinicio', { replaceUrl: true });
    // this.router.navigate(["resultado", placa]);
    // this.router.navigate(["tabinicio", placa]);
  }

  registrarReporte(tipoReporte : string){
    this.router.navigateByUrl('registrodireccion/' + tipoReporte + '/' + this.idCategoriaSeleccionada, { replaceUrl: true });
  }
}
