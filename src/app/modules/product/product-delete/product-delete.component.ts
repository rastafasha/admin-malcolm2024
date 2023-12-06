import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  @Input() product:any; //recibe la data
  @Output() productD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.productService.isLoading$;
  }

  eliminar(){
    this.productService.deleteProduct(this.product.id).subscribe(
      (res:any)=>{
        this.productD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
