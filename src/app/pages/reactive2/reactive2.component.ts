import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive2',
  templateUrl: './reactive2.component.html'
})
export class Reactive2Component implements OnInit {
  
  forma:FormGroup
  constructor( private fb:FormBuilder) { 
    this.creaFormulario ()
  }
  
  get telefonos(){
    return this.forma.get("telefonos") as FormArray
  }
  get nombreInvalido(){
    return this.forma.get("nombre").invalid &&  this.forma.get("nombre").touched
  }
  get apellidoInvalido(){
    return this.forma.get("apellido").invalid &&  this.forma.get("apellido").touched
  }
  get telefonoInvalido(){
    return this.forma.get("telefono").invalid &&  this.forma.get("telefono").touched
  }
  telefonosInvalido(i:number){
    return this.telefonos.controls[i].invalid &&  this.telefonos.controls[i].touched
  }

  ngOnInit(): void {
  }
  creaFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      telefonos: this.fb.array([])
    })
  }
  agregaTelefono(){
    this.telefonos.push(this.fb.control([''],[Validators.required, Validators.minLength(3)]))
  }
  quitarDir(i:number){
    this.telefonos.removeAt(i)
  }
  guardar(){
    console.log(this.forma);
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
