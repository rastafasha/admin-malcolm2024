import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaProductoListComponent } from './categoria-producto-list/categoria-producto-list.component';
import { CategoriaProductoComponent } from './categoria-producto.component';

const routes: Routes = [
  {path: '', component: CategoriaProductoComponent, 
  children:[
    {path: 'list',
      component: CategoriaProductoListComponent,
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaProductoRoutingModule { }
