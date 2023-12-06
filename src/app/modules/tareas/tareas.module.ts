import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TareasComponent } from './tareas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TareaDeleteComponent } from './tarea-delete/tarea-delete.component';


@NgModule({
  declarations: [
    TareasComponent,
    TareaDeleteComponent
  ],
  exports: [
    TareasComponent,
    TareaDeleteComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class TareasModule { }
