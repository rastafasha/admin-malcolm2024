import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {

  @Input() discount:any; //recibe la data
  @Output() DiscountD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.discountService.isLoading$;
  }

  eliminar(){
    this.discountService.deleteDiscount(this.discount.id).subscribe(
      (res:any)=>{
        this.DiscountD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
