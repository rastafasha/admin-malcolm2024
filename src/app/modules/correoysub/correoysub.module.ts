import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorreoysubRoutingModule } from './correoysub-routing.module';
import { CorreoysubComponent } from './correoysub.component';
import { CorreoListComponent } from './correo-list/correo-list.component';
import { SubcListComponent } from './subc-list/subc-list.component';
import { CorreoDetailComponent } from './correo-detail/correo-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CorreoysubComponent,
    CorreoListComponent,
    SubcListComponent,
    CorreoDetailComponent
  ],
  exports: [
    CorreoysubComponent,
    CorreoListComponent,
    SubcListComponent,
    CorreoDetailComponent
  ],
  imports: [
    CommonModule,
    CorreoysubRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class CorreoysubModule { }
