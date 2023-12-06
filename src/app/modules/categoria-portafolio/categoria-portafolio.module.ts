import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaPortafolioRoutingModule } from './categoria-portafolio-routing.module';
import { CategoriaPortafolioAddComponent } from './categoria-portafolio-add/categoria-portafolio-add.component';
import { CategoriaPortafolioListComponent } from './categoria-portafolio-list/categoria-portafolio-list.component';
import { CategoriaPortafolioEditComponent } from './categoria-portafolio-edit/categoria-portafolio-edit.component';
import { CategoriaPortafolioComponent } from './categoria-portafolio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [
    CategoriaPortafolioAddComponent,
    CategoriaPortafolioListComponent,
    CategoriaPortafolioEditComponent,
    CategoriaPortafolioComponent
  ],
  exports: [
    CategoriaPortafolioAddComponent,
    CategoriaPortafolioListComponent,
    CategoriaPortafolioEditComponent,
    CategoriaPortafolioComponent
  ],
  imports: [
    CommonModule,
    CategoriaPortafolioRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class CategoriaPortafolioModule { }
