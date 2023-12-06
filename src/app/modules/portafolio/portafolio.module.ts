import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortafolioRoutingModule } from './portafolio-routing.module';
import { PortafolioComponent } from './portafolio.component';
import { PortafolioEditComponent } from './portafolio-edit/portafolio-edit.component';
import { PortafolioAddComponent } from './portafolio-add/portafolio-add.component';
import { PortafolioDeleteComponent } from './portafolio-delete/portafolio-delete.component';
import { PortafolioListComponent } from './portafolio-list/portafolio-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PortafolioComponent,
    PortafolioEditComponent,
    PortafolioAddComponent,
    PortafolioDeleteComponent,
    PortafolioListComponent
  ],
  exports: [
    PortafolioComponent,
    PortafolioEditComponent,
    PortafolioAddComponent,
    PortafolioDeleteComponent,
    PortafolioListComponent
  ],
  imports: [
    CommonModule,
    PortafolioRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class PortafolioModule { }
