import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDeleteComponent } from '../coupon-delete/coupon-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  COUPONS:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;

  constructor(
    public modalService: NgbModal,
    public couponService: CouponService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.couponService.isLoading$;
    this.listarCoupons();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  
  listarCoupons(){
    this.couponService.listCupons(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.COUPONS = res.coupons.data;
        console.log(this.COUPONS);
      }
    )
  }

  
   eliminarCoupon(coupon:any){
    const modalRef = this.modalService.open(CouponDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.coupon = coupon;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.couponD.subscribe((res:any)=>{
      let INDEX =  this.COUPONS.findIndex((item:any) => item.id == res.id)
      this.COUPONS.splice(INDEX, 1);
      this.listarCoupons();
    })

  }
}
