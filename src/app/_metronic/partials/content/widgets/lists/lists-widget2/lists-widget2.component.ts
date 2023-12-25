import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleVentaComponent } from 'src/app/modules/ventas/detalle-venta/detalle-venta.component';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-lists-widget2',
  templateUrl: './lists-widget2.component.html',
})
export class ListsWidget2Component {
  @Input() childMessage:any; //recibe la data
  @Output() userV: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;
  mapa:any;
  SALES:any;
  direccionSelected:any =null;

  constructor(
    public dashboarService: DasboardService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.dashboarService.isLoading$;

    // this.n_transaccion = this.user.n_transaccion;
    console.log(this.childMessage);

    this.SALES = this.childMessage.sales;

  }

  verVenta(sale:any){
    const modalRef = this.modalService.open(DetalleVentaComponent,{centered: true, size:'md'})
    modalRef.componentInstance.sale = sale;
    modalRef.componentInstance.SALES = this.SALES.filter((sale:any) => !sale.sale_id);
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.saleE.subscribe((Sale:any)=>{
      let INDEX =  this.SALES.findIndex((item:any) => item.id == Sale.id)
      this.SALES[INDEX] = Sale;
      this.ngOnInit();
    })


  }
}
