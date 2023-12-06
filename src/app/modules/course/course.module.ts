import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';


import { CKEditorModule } from 'ckeditor4-angular';
import { SectionAddComponent } from './section/section-add/section-add.component';
import { SectionEditComponent } from './section/section-edit/section-edit.component';
import { SectionDeleteComponent } from './section/section-delete/section-delete.component';
import { ClassAddComponent } from './section/classe/class-add/class-add.component';
import { ClassEditComponent } from './section/classe/class-edit/class-edit.component';
import { ClassDeleteComponent } from './section/classe/class-delete/class-delete.component';
import { ClassDeleteFileComponent } from './section/classe/class-delete-file/class-delete-file.component';
@NgModule({
  declarations: [
    CourseListComponent,
    CourseComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
    ClassAddComponent,
    ClassEditComponent,
    ClassDeleteComponent,
    ClassDeleteFileComponent
  ],
  exports: [
    CourseListComponent,
    CourseComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
    ClassAddComponent,
    ClassEditComponent,
    ClassDeleteComponent,
    ClassDeleteFileComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class CourseModule { }
