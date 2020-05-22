import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor( private http:HttpClient ) { }

  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(map( (resp:any) =>{
      return resp.map((paises:any) =>{
        return {
          nombre: paises.name,
          codigo: paises.alpha3Code
        }
      })
    }))
  }
}
