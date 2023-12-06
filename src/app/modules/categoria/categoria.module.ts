import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';


@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
    CategoriaEditComponent,
    CategoriaDeleteComponent
  ],
  exports: [
    CategoriaComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
    CategoriaEditComponent,
    CategoriaDeleteComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CategoriaModule { }
