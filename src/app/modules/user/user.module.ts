import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeletComponent } from './user-delet/user-delet.component';
import { UserClientesComponent } from './user-clientes/user-clientes.component';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeletComponent,
    UserClientesComponent
  ],
  exports: [
    UserComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeletComponent,
    UserClientesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class UserModule { }
