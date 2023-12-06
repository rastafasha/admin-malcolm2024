import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DeliveryDeleteComponent } from './delivery-delete/delivery-delete.component';


@NgModule({
  declarations: [
    DeliveryComponent,
    DeliveryDeleteComponent
  ],
  exports: [
    DeliveryComponent,
    DeliveryDeleteComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class DeliveryModule { }
