import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaComponent } from './categoria.component';

const routes: Routes = [
  {path: '', component: CategoriaComponent, 
  children:[
    {path: 'list',
      component: CategoriaListComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
