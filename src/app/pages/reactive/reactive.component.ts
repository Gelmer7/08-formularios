import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {
  forma:FormGroup
  nPasatempos:number

  constructor(  private fb:FormBuilder,
                private validadores:ValidadoresService) {
    this.crearFormulario()
    this.cargarValoresForm()
    this.crearListeners()
   }

  ngOnInit(): void {
  }

  itemInvalido( i:number){
    return this.pasatiempos.controls[i].invalid && this.pasatiempos.controls[i].touched
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }
  get nombreInvalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoInvalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoInvalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioInvalido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get pass1Invalido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }
  get pass2Invalido(){
    return this.forma.get('pass2').invalid && this.forma.get('pass2').touched
  }
  get distritoInvalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadInvalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['aaa',[Validators.required, Validators.minLength(3)]],
      apellido: ['bbb',[Validators.required, Validators.minLength(3), this.validadores.noHerrera]],
      correo: ['bbb@ggg.com',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario: ['',[Validators.required],this.validadores.existeUsuario],
      pass1: ['',Validators.required],
      pass2: ['',Validators.required],
      direccion : this.fb.group({
        distrito:['',[Validators.required]],
        ciudad: ['',[Validators.required]]
      }),
      pasatiempos:this.fb.array([])
    },{
      validators: this.validadores.passIguales('pass1', 'pass2')
    })
  }

  crearListeners(){
/*     this.forma.valueChanges.subscribe(valor =>{
      console.log(valor);
    })
    this.forma.statusChanges.subscribe(valor =>{
      console.log(valor);
    }) */
    this.forma.get('nombre').valueChanges.subscribe(console.log)

  }
  cargarValoresForm(){
    //this.forma.setValue(
    this.forma.reset({
        nombre: "Gelmer",
        apellido: "Apaza",
        correo: "ppee@ee.com",
        pass1:"123",
        pass2:"123",
        direccion:{
          distrito: "ddd",
          ciudad: "vicosa" 
        }
    })
    //para insertar valores en el array
/*     let valores=['vvvvvv','dormir']
    valores.forEach(element => {
      this.pasatiempos.push(this.fb.control(element,[Validators.required]))
    }); */
  }

  agregaPasatiempos(){
    this.pasatiempos.push(this.fb.control('',[Validators.required]))
  }
  removePasatiempo(i:number){
    this.pasatiempos.removeAt(i)
  }

  guardar(){
    console.log(this.forma.controls);
    if (this.forma.invalid) {
      console.log(this.forma.controls);
      Object.values(this.forma.controls).forEach(el => {
        if(el instanceof FormGroup){ 
          Object.values(el.controls).forEach(elem => {
            if (elem.invalid) {
              elem.markAsTouched()
            }
          })
        }
        if(el instanceof FormArray){
          Object.values(el.controls).forEach(elem => {
            if (elem.invalid) {
              elem.markAsTouched()
            }
          })
        }
        if (el.invalid) {
          el.markAsTouched()
        }
      });
    }else{
      console.log("Form Validado: ",this.forma.value);
      this.forma.reset({
      nombre:'pepe'
      })
    }
  }
}
