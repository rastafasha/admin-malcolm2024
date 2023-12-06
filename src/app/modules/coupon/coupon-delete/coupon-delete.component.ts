import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-delete',
  templateUrl: './coupon-delete.component.html',
  styleUrls: ['./coupon-delete.component.scss']
})
export class CouponDeleteComponent implements OnInit {

  @Input() coupon:any; //recibe la data
  @Output() couponD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.couponService.isLoading$;
  }

  eliminar(){
    this.couponService.deleteCupon(this.coupon.id).subscribe(
      (res:any)=>{
        this.couponD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
