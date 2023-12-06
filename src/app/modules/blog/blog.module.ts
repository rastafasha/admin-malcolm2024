import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [
    BlogDeleteComponent,
    BlogEditComponent,
    BlogAddComponent,
    BlogComponent,
    BlogListComponent
  ],
  exports: [
    BlogDeleteComponent,
    BlogEditComponent,
    BlogAddComponent,
    BlogComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class BlogModule { }
