import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar el servicio ActivatedRoute
import { ModalController, PickerController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { FileUploader } from 'ng2-file-upload';

import { IonRouterOutlet } from '@ionic/angular';
//import { IonStepper } from '@ionic/angular'; // <- asegurarse de importar IonStepper


@Component({
  selector: 'app-registro-juridica',
  templateUrl: './registro-juridica.component.html',
  styleUrls: ['./registro-juridica.component.scss'],
})
export class RegistroJuridicaComponent implements OnInit {

  //step1Form: FormGroup;
  //step2Form: FormGroup;
  currentStep = 0;
  // fechaEmision: Date;
  selectedDate: string;


  step1Form = new FormGroup({
    rucempresa: new FormControl()

  });

  step2Form = new FormGroup({
    razonSocial: new FormControl('', Validators.required),
    direccionempresa: new FormControl('', Validators.required),
    tipodocumentorep: new FormControl('', Validators.required),
    nrodocumentorep: new FormControl('', Validators.required),
    digitoverificador: new FormControl('', Validators.required),
    fechaemisionrep: new FormControl('', Validators.required)
  });

  step3Form = new FormGroup({
    apepat: new FormControl('', Validators.required),
    apemat: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required)
  });

  step4Form = new FormGroup({
    correo: new FormControl('', Validators.required)
  });


  constructor(  private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private pickerController: PickerController,
    private router: Router
    ) {
     // this.fechaEmision = new Date();
     this.selectedDate = "";
    }

  ngOnInit() {

    this.step1Form = new FormGroup({
      rucempresa: new FormControl()
  
    });
  
    this.step2Form = new FormGroup({
      razonSocial: new FormControl('', Validators.required),
      direccionempresa: new FormControl('', Validators.required),
      tipodocumentorep: new FormControl('', Validators.required),
      nrodocumentorep: new FormControl('', Validators.required),
      digitoverificador: new FormControl('', Validators.required),
      fechaemisionrep: new FormControl('', Validators.required)
    });
  
    this.step3Form = new FormGroup({
      apepat: new FormControl('', Validators.required),
      apemat: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required)
    });
  
    this.step4Form = new FormGroup({
      correo: new FormControl('', Validators.required)
    });
  }

  async openDatePicker() {
    console.log("entro")
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Seleccionar',
          handler: (value: any) => {
            this.selectedDate = value.day.text + '/' + value.month.text + '/' + value.year.text;
          }
        }
      ],
      columns: [
        {
          name: 'day',
          options: this.getColumnOptions(1, 31)
        },
        {
          name: 'month',
          options: this.getColumnOptions(1, 12)
        },
        {
          name: 'year',
          options: this.getColumnOptions(1900, 2023)
        }
      ]
    });
  
    await picker.present();
  }
  getColumnOptions(start: number, end: number) {
    const options = [];
  
    for (let i = start; i <= end; i++) {
      options.push({
        text: i.toString(),
        value: i
      });
    }
  
    return options;
  }

  formularioUnoEsValido(){
    return this.step1Form.valid;
  }

  formularioDosEsValido(){
    return this.step2Form.valid;
  }

  nextStep() {


    switch (this.currentStep) {
      case 0:
        if(this.formularioUnoEsValido()){this.currentStep++;}
        break;
      case 1:
        if(this.formularioDosEsValido()){this.currentStep++;}
        break;
      case 2:
          if(this.formularioDosEsValido()){this.currentStep++;}
          break;
      default:
        break;
    }
  }

  cancelar(){
    this.router.navigateByUrl('preregistro', { replaceUrl: true });
  }
  
  previousStep() {
    this.currentStep--;
  }

  submit() {
    const formValues = Object.assign({}, this.step1Form.value, this.step2Form.value,this.step3Form.value);
    console.log(formValues);
  }
}
