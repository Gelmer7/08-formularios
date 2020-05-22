import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  
  usuario ={
    nombre : 'ssss',
    apellido: 'aaaa',
    correo:'gelmer@eu.com',
    pais:'',
    genero: ''
  }
  paises:any []=[]
  

  constructor( private paisesService:PaisesService ) { 
  }
  
  ngOnInit(): void {
    this.paisesService.getPaises()
    .subscribe(data=>{
      this.paises = data
      this.paises.unshift({nombre: "[Seleccione un pais]", codigo:''})
    })
  }
  guardar(forma:NgForm){
    console.log("form: ",forma.value);
    console.log("controles: ", forma.controls);
    if (forma.invalid) {
      Object.values(forma.controls).forEach(el => {
        if (el.invalid) {
          el.markAsTouched()
        }
      });
    }
  }

}
