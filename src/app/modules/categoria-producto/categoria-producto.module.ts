import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaProductoRoutingModule } from './categoria-producto-routing.module';
import { CategoriaProductoAddComponent } from './categoria-producto-add/categoria-producto-add.component';
import { CategoriaProductoEditComponent } from './categoria-producto-edit/categoria-producto-edit.component';
import { CategoriaProductoListComponent } from './categoria-producto-list/categoria-producto-list.component';
import { CategoriaProductoDeleteComponent } from './categoria-producto-delete/categoria-producto-delete.component';
import { CategoriaProductoComponent } from './categoria-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CategoriaProductoAddComponent,
    CategoriaProductoEditComponent,
    CategoriaProductoListComponent,
    CategoriaProductoDeleteComponent,
    CategoriaProductoComponent
  ],
  imports: [
    CommonModule,
    CategoriaProductoRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class CategoriaProductoModule { }
