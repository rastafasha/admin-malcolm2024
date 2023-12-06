import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountDeleteComponent } from './discount-delete/discount-delete.component';
import { DiscountComponent } from './discount.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    DiscountListComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    DiscountDeleteComponent,
    DiscountComponent
  ],
  exports: [
    DiscountListComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    DiscountDeleteComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class DiscountModule { }
