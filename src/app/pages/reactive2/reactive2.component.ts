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
  
  get direcciones(){
    return this.forma.get("direcciones") as FormArray
  }
  get nombreInvalido(){
    return this.forma.get("nombre").invalid &&  this.forma.get("nombre").touched
  }
  get apellidoInvalido(){
    return this.forma.get("apellido").invalid &&  this.forma.get("apellido").touched
  }
  get direccionInvalido(){
    return this.forma.get("direccion").invalid &&  this.forma.get("direccion").touched
  }
  direccionesInvalido(i:number){
    return this.direcciones.controls[i].invalid &&  this.direcciones.controls[i].touched
  }

  ngOnInit(): void {
  }
  creaFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido : ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      direcciones: this.fb.array([])
    })
  }
  agregaDirecciones(){
    this.direcciones.push(this.fb.control([''],[Validators.required, Validators.minLength(3)]))
  }
  quitarDir(i:number){
    this.direcciones.removeAt(i)
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
