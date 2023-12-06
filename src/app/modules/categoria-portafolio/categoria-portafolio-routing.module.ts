import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaPortafolioComponent } from './categoria-portafolio.component';
import { CategoriaPortafolioListComponent } from './categoria-portafolio-list/categoria-portafolio-list.component';

const routes: Routes = [
  {path: '', component: CategoriaPortafolioComponent, 
  children:[
    {path: 'list',
      component: CategoriaPortafolioListComponent,
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaPortafolioRoutingModule { }
