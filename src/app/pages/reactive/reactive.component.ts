import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma:FormGroup
  nPasatempos:number

  constructor( private fb:FormBuilder) {
    this.crearFormulario()
    this.cargarValoresForm()
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
  get distritoInvalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadInvalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['aaa',[Validators.required, Validators.minLength(3)]],
      apellido: ['bbb',[Validators.required, Validators.minLength(3)]],
      correo: ['bbb@ggg.com',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion : this.fb.group({
        distrito:['',[Validators.required]],
        ciudad: ['',[Validators.required]]
      }),
      pasatiempos:this.fb.array([])
    })
  }
  cargarValoresForm(){
    //this.forma.setValue(
    this.forma.reset({
        nombre: "Gelmer",
        apellido: "Apaza",
        correo: "ppee@ee.com",
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
