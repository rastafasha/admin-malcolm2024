import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountComponent } from './discount.component';

const routes: Routes = [
  { path: '', component: DiscountComponent, 
      children:[
        { path: 'registro', component: DiscountAddComponent},
        { path: 'list', component: DiscountListComponent},
        { path: 'list/editar/:id', component: DiscountEditComponent},
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
