import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../service/discount.service';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  DISCOUNTS:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;

  constructor(
    public modalService: NgbModal,
    public discountService: DiscountService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.discountService.isLoading$;
    this.listarDiscounts();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  
  listarDiscounts(){
    this.discountService.listDiscounts(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.DISCOUNTS = res.discounts.data;
        console.log(this.DISCOUNTS);
      }
    )
  }

  
  eliminarDiscount(discount:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.discount = discount;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.DiscountD.subscribe((res:any)=>{
      let INDEX =  this.DISCOUNTS.findIndex((item:any) => item.id == res.id)
      this.DISCOUNTS.splice(INDEX, 1);
      this.listarDiscounts();
    })

  }

}
