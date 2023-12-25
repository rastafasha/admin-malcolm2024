import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../../user/service/user.service';
import { VentasService } from '../service/ventas.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss']
})
export class DetalleVentaComponent implements OnInit {

  @Input() sale:any; //recibe la data
  @Output() saleE: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  n_transaccion:any;
  method_payment:any;
  price_dolar:any;
  precio_envio:any;
  total:any;
  currency_payment:any;
  status:any;
  sale_details:any=[];
  
  code_discount:any;


  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public ventaService: VentasService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.ventaService.isLoading$;

    this.n_transaccion = this.sale.n_transaccion;
    this.method_payment = this.sale.method_payment;
    this.price_dolar = this.sale.price_dolar;
    this.precio_envio = this.sale.precio_envio;
    this.total = this.sale.total;
    this.currency_payment = this.sale.currency_payment;
    this.status = this.sale.status;
    this.sale_details = this.sale.sale_details;
    // this.code_discount = this.sale.sale_details[0].code_discount;
    console.log(this.sale);
    // console.log(this.sale_details);
    // console.log(this.code_discount);
  }

}
