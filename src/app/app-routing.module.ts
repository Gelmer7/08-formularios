import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';
import { Reactive2Component } from './pages/reactive2/reactive2.component';


const routes: Routes = [
  { path:'reactivo', component:ReactiveComponent},
  { path:'template', component:TemplateComponent},
  { path:'reactivo2', component:Reactive2Component},
  { path:'', pathMatch:'full', redirectTo:'reactivo'},
  { path:'**', pathMatch:'full', redirectTo:'reactivo'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
