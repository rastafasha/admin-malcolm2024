import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortafolioComponent } from './portafolio.component';
import { PortafolioAddComponent } from './portafolio-add/portafolio-add.component';
import { PortafolioEditComponent } from './portafolio-edit/portafolio-edit.component';
import { PortafolioListComponent } from './portafolio-list/portafolio-list.component';

const routes: Routes = [
  { path: '', component: PortafolioComponent, 
      children:[
        { path: 'registro', component: PortafolioAddComponent},
        
        { path: 'list', component: PortafolioListComponent},
        { path: 'list/editar/:id', component: PortafolioEditComponent},
      ]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortafolioRoutingModule { }
