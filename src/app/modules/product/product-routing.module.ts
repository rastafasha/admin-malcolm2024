import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriaListComponent } from '../categoria/categoria-list/categoria-list.component';


const routes: Routes = [
  { path: '', component: ProductComponent, 
      children:[
        { path: 'registro', component: ProductAddComponent},
        
        { path: 'list', component: ProductListComponent},
        { path: 'categorias/list', component: CategoriaListComponent},
        { path: 'list/editar/:id', component: ProductEditComponent},
        // { path: 'list/secciones/:id', component: SectionAddComponent},
        // { path: 'list/secciones/clases/:id', component: ClassAddComponent},
      ]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
