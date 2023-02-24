import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar el servicio ActivatedRoute
import { ModalController, PickerController, NavController,AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService} from '../../../services/usuario.service';
import { IonRouterOutlet } from '@ionic/angular';

//import { IonStepper } from '@ionic/angular'; // <- asegurarse de importar IonStepper


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  //step1Form: FormGroup;
  //step2Form: FormGroup;
  currentStep = 0;
  // fechaEmision: Date;
  selectedDate: string;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  step1Form = new FormGroup({
    tipodocumento: new FormControl(),
    nrodocumento: new FormControl(),
    digitoverificador: new FormControl(),
    fechaemision: new FormControl()
  });

  step2Form = new FormGroup({
    apepat: new FormControl('', Validators.required),
    apemat: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required)
  });

  step3Form = new FormGroup({
    correo: new FormControl('', Validators.required)
  });

  constructor(  
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private pickerController: PickerController,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController :ToastController
    ) {
     // this.fechaEmision = new Date();
     this.selectedDate = "";
    }

  ngOnInit() {

    this.step1Form = new FormGroup({
      tipodocumento: new FormControl('', Validators.required),
      nrodocumento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$') ]),
      digitoverificador: new FormControl('', [
        Validators.required,
        Validators.maxLength(1)
      ]),
      fechaemision: new FormControl('', Validators.required)
    });
  
    this.step2Form = new FormGroup({
      apepat: new FormControl('', Validators.required),
      apemat: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required)
    });
    
    this.step3Form = new FormGroup({
      correo: new FormControl('', 
      [ Validators.required,
        Validators.email]
      )
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

  async mostrarAlertaFormularioNoValido(){
    const toast = await this.toastController.create({
      message: 'No puede continuar, verificar los datos ingresados.',
      duration: 5000,
      position : 'top'
    });

    toast.present();
  }

  nextStep() {

    switch (this.currentStep) {
      case 0:
        if(this.formularioUnoEsValido())
        {
          this.currentStep++;
        }else{//formulario 1 no es válido
          this.mostrarAlertaFormularioNoValido();
        }
        break;
      case 1:
        if(this.formularioDosEsValido()){
          this.currentStep++;
        }else{
          this.mostrarAlertaFormularioNoValido();
        }
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

    if(!this.step3Form.valid){
      this.mostrarAlertaFormularioNoValido();
      return;
    }

    this.activarLoading("Registrando, espere porfavor...");

    const formValues = Object.assign({}, this.step1Form.value, this.step2Form.value,this.step3Form.value);

      var dataEnvio = {
        "idTipoPersona": 1,  
        "idTipoDocumento": Number(formValues.tipodocumento), 
        "nroDocumento": formValues.nrodocumento,  
        "digitoVerifica":  formValues.digitoverificador, 
        "fechaEmision": formValues.fechaemision, 
        "nombres": formValues.nombres,
        "apepat": formValues.apepat,  
        "apemat": formValues.apemat, 
        "email": formValues.correo,
        "celularm": formValues.celular, 
        "telefono": formValues.telefono, 
        "clave": "", 
        "ruc": "", 
        "razonSocial": "", 
        "direccionEmpresa": "" 
    };



    this.usuarioService.registrarUsuario(dataEnvio).subscribe(
      (data :any) =>{

        setTimeout(() => this.desactivarLoading(), 500);

        var success = data.success;
        var codResultado = 0;
        var desResultado = "";
        if(success){
          codResultado = data.codRespuesta;
          desResultado = data.desRespuesta;
          //
          if(codResultado == 1){
            this.limpiarFormulario();//limpia todos los datos del formulario
          }
          //
          this.mostrarMensajeConfirmacion(
            desResultado, 
            (codResultado ==1 ? true:false),
            (codResultado ==1 ? "Registro exitoso": "Notificación") 
          );
        }else{
          this.mostrarMensajeConfirmacion("Ocurrió un error al llamar al servicio.", false, "Notificación");
        }
      }
    );
  }

  limpiarFormulario(){
    this.step1Form = new FormGroup({
      tipodocumento: new FormControl('', Validators.required),
      nrodocumento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$') ]),
      digitoverificador: new FormControl('', [
        Validators.required,
        Validators.maxLength(1)
      ]),
      fechaemision: new FormControl('', Validators.required)
    });
  
    this.step2Form = new FormGroup({
      apepat: new FormControl('', Validators.required),
      apemat: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required)
    });
    
    this.step3Form = new FormGroup({
      correo: new FormControl('', 
      [ Validators.required,
        Validators.email]
      )
    });
  }

  mostrarMensajeConfirmacion(mensaje : string, redireccionaLogin : boolean, subtitulo : string){
    const notificacionDeUso = this.alertController.create({
      header: subtitulo,
      cssClass: 'alerta-roja',
      message:  mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if(redireccionaLogin){
              this.router.navigateByUrl('login', { replaceUrl: true });

            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  activarLoading(textoloading : string) {
    this.loadingController.create({
        message: textoloading,
    }).then((response) => {
        response.present();
    });
  }

  desactivarLoading() {
    this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
  }


}
