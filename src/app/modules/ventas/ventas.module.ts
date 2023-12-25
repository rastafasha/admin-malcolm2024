import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { EntregadosListComponent } from './entregados-list/entregados-list.component';
import { CanceladosListComponent } from './cancelados-list/cancelados-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';


@NgModule({
  declarations: [
    VentasComponent,
    PedidosListComponent,
    EntregadosListComponent,
    CanceladosListComponent,
    DetalleVentaComponent
  ],
  exports: [
    VentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    HttpClientModule,
    InlineSVGModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class VentasModule { }
