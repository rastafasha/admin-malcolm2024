import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { EntregadosListComponent } from './entregados-list/entregados-list.component';
import { CanceladosListComponent } from './cancelados-list/cancelados-list.component';

const routes: Routes = [
  {path: '', component: VentasComponent, 
  children:[
    {path: 'list',
      component: PedidosListComponent,
    },
    {path: 'list-entregados',
      component: EntregadosListComponent,
    },
    {path: 'list-cancelados',
      component: CanceladosListComponent,
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
