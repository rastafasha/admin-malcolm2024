import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { Toaster } from 'ngx-toast-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {
  isLoading:any;
  code:any = null;
  type_discount:number = 0;
  type_count:number = 0;
  type_coupon:number = 0;
  discount:number = 0;
  num_use:number = 0;
  
  category_id:any = null;
  course_id:any = null;
  courses:any =[];
  categories:any =[];
  category_selecteds:any =[];
  course_selecteds:any =[];

  constructor(
    public couponService: CouponService,
    public toaster: Toaster,
    private location: Location,
  ) { }


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.couponService.isLoading$;
    this.listarConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  listarConfig(){
    this.couponService.listarConfig().subscribe((res:any)=>{
      console.log(res);
      this.courses = res.courses;
      this.categories = res.categories;
    })
  }

  save(){debugger
    if(!this.code || !this.discount){
      this.toaster.open({
        text:'Debes colocar todos los campos.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }
    if(this.type_count === 2 && !this.num_use  ){
      this.toaster.open({
        text:'Debes ingresar un numero de usos limitados.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }

    if(this.type_coupon === 1 && this.course_selecteds.length == 0  ){
      this.toaster.open({
        text:'Debes seleccionar minimo un curso.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }

    if(this.type_coupon === 2 && this.category_selecteds.lenght == 0  ){
      this.toaster.open({
        text:'Debes seleccionar minimo una categoria.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }
    let data = {
        code: this.code,
        type_discount: this.type_discount,
        discount: this.discount,
        type_count: this.type_count,
        type_coupon: this.type_coupon,
        num_use: this.num_use,
        course_selected: this.course_selecteds,
        category_selected: this.category_selecteds,
        category_id: this.category_id,
        course_id: this.course_id,
    }
    this.couponService.registerCupon(data).subscribe((res:any)=>{
      console.log(res);
      if(res.message == 403){
        this.toaster.open({
          text: res.message_text,
          caption:'VALIDACIÓN',
          type:'danger'
        });
      }else{
        this.toaster.open({
          text:'Se ha registrado un Cupón',
          caption:'VALIDACIÓN',
          type:'success'
        });

        this.code = null
        this.discount = 0
        this.type_discount = 1
        this.type_coupon = 1
        this.type_count = 1
        this.num_use = 0
        this.course_selecteds = [];
        this.category_selecteds = [];
        this.course_id = null;
        this.category_id = null;


      }
    })
  }

  selectedTypeDiscount(value:any){
    this.type_discount = value;
  }
  selectedTypeCount(value:any){
    this.type_count = value;
  }
  selectedTypeCoupon(value:any){
    this.type_coupon = value;
    console.log(this.type_coupon);
  }

  addCourseSelected(){
    let VALID = this.course_selecteds.findIndex((course:any)=> course.id == this.course_id);
    if(VALID == -1){
      let INDEX = this.courses.findIndex((course:any)=> course.id == this.course_id);
      if(INDEX){
        this.course_selecteds.push(this.courses[INDEX]);
        this.course_id = null;
      }
    }
    
    
  }

  addCategorySelected(){
    let VALID = this.category_selecteds.findIndex((categorie:any)=> categorie.id == this.category_id);
    if(VALID == -1){
      let INDEX = this.categories.findIndex((categorie:any)=> categorie.id == this.category_id);
      if(INDEX){
        this.category_selecteds.push(this.categories[INDEX]);
        this.category_id = null;
      }
    }
    
  }


  deleteCourse(i:number){
    this.course_selecteds.splice(i,1);
    
  }
  deleteCat(i:number){
    this.category_selecteds.splice(i,1);


  }

}
