import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';
import { VentasService } from '../service/ventas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cancelados-list',
  templateUrl: './cancelados-list.component.html',
  styleUrls: ['./cancelados-list.component.scss']
})
export class CanceladosListComponent implements OnInit {

  SALES:any = [];
  SALE_CATEGORY_COURSE:any = [];
  SALE_CATEGORY_PRODUCT:any = [];
  salecategories:any = [];
  isLoading: any = null;
  search:any= null;
  status:any= null;



  constructor(
    public ventaService: VentasService,
    public modalService: NgbModal,
    public toaster: Toaster,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.ventaService.isLoading$;
    this.listarPedidos();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  listarPedidos(){
    this.ventaService.listCancelados().subscribe(
      (res:any)=>{
        console.log(res);
        this.SALES = res.sales;
      }
    )
  }

  
  verVenta(sale:any){
    const modalRef = this.modalService.open(DetalleVentaComponent,{centered: true, size:'md'})
    modalRef.componentInstance.sale = sale;
    modalRef.componentInstance.SALES = this.SALES.filter((sale:any) => !sale.sale_id);
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.saleE.subscribe((Sale:any)=>{
      let INDEX =  this.SALES.findIndex((item:any) => item.id == Sale.id)
      this.SALES[INDEX] = Sale;
      this.listarPedidos();
    })


  }

  cambiarStatus(sale:any){
    this.ventaService.updateStatus(sale).subscribe(
      resp =>{ console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.toaster.open({
          text:'El Status se Actualizado correctamente',
          caption: 'Informe',
          type:'success'
        })
        this.listarPedidos();
      }
    )
  }
}
