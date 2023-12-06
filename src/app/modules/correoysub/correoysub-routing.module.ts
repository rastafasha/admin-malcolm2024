import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreoysubComponent } from './correoysub.component';
import { CorreoListComponent } from './correo-list/correo-list.component';
import { SubcListComponent } from './subc-list/subc-list.component';
import { CorreoDetailComponent } from './correo-detail/correo-detail.component';

const routes: Routes = [
  { path: '', component: CorreoysubComponent, 
      children:[
        { path: 'correos', component: CorreoListComponent},
        { path: 'correos/:id', component: CorreoDetailComponent},
        { path: 'subcripciones', component: SubcListComponent},
      ]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorreoysubRoutingModule { }
