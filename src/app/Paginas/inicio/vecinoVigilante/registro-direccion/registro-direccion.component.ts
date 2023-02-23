import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar el servicio ActivatedRoute
import { ModalController, PickerController, NavController,RangeCustomEvent  } from '@ionic/angular';
import { Router } from '@angular/router';
import { RangeValue } from '@ionic/core';

declare var google : any;


@Component({
  selector: 'app-registro-direccion',
  templateUrl: './registro-direccion.component.html',
  styleUrls: ['./registro-direccion.component.scss'],
})


export class RegistroDireccionComponent implements OnInit {

  currentStep = 0;
  lastEmittedValue: RangeValue;
  mapLoaded = false;

  // @ViewChild('contenidomapa', { static: false }) mapElement: ElementRef;
  @ViewChild('contenidomapa', {static: false}) mapElement: ElementRef;



  step1Form = new FormGroup({
    direccionalerta: new FormControl(),
    referenciadireccion: new FormControl()

  });

  step2Form = new FormGroup({
    observacionalerta: new FormControl('', Validators.required)
  });

  constructor(private router: Router) { 
    this.lastEmittedValue= 0;
    this.mapElement = new ElementRef(document.getElementById('contenidomapa'));
  }

  map : any;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMap();
  }


  loadMap() {

    let latLng = new google.maps.LatLng( -12.0453, -77.0311);
    let mapOptions = {
     center : latLng,
     zoom : 11,
     disableDefaultUI: true,
     //mapTypeId : google.maps.MapTypeId.ROADMAP,
    //  zoom: 19.5,
    // heading: 320,
    //   tilt: 27.5,
    //  mapId: "90f87356969d889c",
    };

    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // this.map.addListener('tilesloaded', () => {
    //   this.mapLoaded = true;
    // });

    //
    // const buttons = [
    //   ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
    //   ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],

    //   ["Tilt Down", "tilt", 20, google.maps.ControlPosition.LEFT_CENTER],
    //   ["Tilt Up", "tilt", -20, google.maps.ControlPosition.RIGHT_CENTER],
    // ];
    // let mapa = this.map;
    // buttons.forEach(([text, mode, amount, position]) => {
    //   const controlDiv = document.createElement("div");
    //   const controlUI = document.createElement("button");
    //   controlUI.classList.add("ui-button");
    //   controlUI.innerText = `${text}`;
    //   controlUI.addEventListener("click", () => {
    //     adjustMap(mode, amount);
    //   });
    //   controlDiv.appendChild(controlUI);
    //   mapa.controls[position].push(controlDiv);
    // });
    
    // const adjustMap = function (mode, amount) {
    //   switch (mode) {
    //     case "tilt":
    //       mapa.setTilt(mapa.getTilt() + amount);
    //       break;
    //     case "rotate":
    //       mapa.setHeading(mapa.getHeading() + amount);
    //       break;
    //     default:
    //       break;
    //   }
    // };
    //
    // this.map.addListener("click", (mapsMouseEvent) => {
    //   // Close the current InfoWindow.
    //   console.log("clickmouse->",mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng())    
    // });

  }

  regresar(){
    this.router.navigateByUrl('seleccionarcatvecinovig', { replaceUrl: true });

  }

  cancelar(){
    this.router.navigateByUrl('preregistro', { replaceUrl: true });
  }
  
  formularioUnoEsValido(){
    return this.step1Form.valid;
  }

  formularioDosEsValido(){
    return this.step2Form.valid;
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }

  nextStep() {


    switch (this.currentStep) {
      case 0:
        if(this.formularioUnoEsValido()){this.currentStep++;}
        break;
      case 1:
        if(this.formularioDosEsValido()){this.currentStep++;}
        break;
      default:
        break;
    }
  }

  previousStep() {
    this.currentStep--;
  }

  submit() {
    const formValues = Object.assign({}, this.step1Form.value, this.step2Form.value);
    console.log(formValues);
  }
}
