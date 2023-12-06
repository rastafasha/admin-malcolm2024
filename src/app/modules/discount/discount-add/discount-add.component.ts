import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { Toaster } from 'ngx-toast-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit {

  isLoading:any;
  code:any;
  type_discount:number = 1;
  discount_type:number = 1;
  discount:number = 0;
  type_campaing:number = 1;//1:normal 2flash 3banner
  start_date:any=null;
  end_date:any=null;
  
  category_id:any = null;
  course_id:any = null;
  courses:any =[];
  categories:any =[];
  category_selecteds:any =[];
  course_selecteds:any =[];

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster,
    private location: Location,
  ) { }


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.discountService.isLoading$;
    this.listarConfig();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listarConfig(){
    this.discountService.listarConfig().subscribe((res:any)=>{
      console.log(res);
      this.courses = res.courses;
      this.categories = res.categories;
    })
  }

  save(){debugger
    if(!this.discount || !this.start_date || !this.end_date){
      this.toaster.open({
        text:'Debes colocar todos los campos.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }
    

    if(this.discount_type === 1 && this.course_selecteds.length == 0  ){
      this.toaster.open({
        text:'Debes seleccionar minimo un curso.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }

    if(this.discount_type === 2 && this.category_selecteds.lenght == 0  ){
      this.toaster.open({
        text:'Debes seleccionar minimo una categoria.',
        caption:'VALIDACIÓN',
        type:'danger'
      })
    }
    let data = {
        
        type_discount: this.type_discount,
        discount: this.discount,
        discount_type: this.discount_type,
        start_date: this.start_date,
        end_date: this.end_date,
        type_campaing: this.type_campaing,
        course_selected: this.course_selecteds,
        category_selected: this.category_selecteds,
    }
    this.discountService.registerDiscount(data).subscribe((res:any)=>{
      console.log(res);
      if(res.message == 403){
        this.toaster.open({
          text: res.message_text,
          caption:'VALIDACIÓN',
          type:'danger'
        });
      }else{
        this.toaster.open({
          text:'Se ha registrado la Campaña',
          caption:'VALIDACIÓN',
          type:'success'
        });

        this.discount = 0;
        this.type_discount = 1;
        this.course_selecteds = [];
        this.category_selecteds = [];
        this.course_id = null;
        this.category_id = null;
        this.discount_type = 0;
        this.type_campaing = 1;
        this.start_date= null;
        this.end_date= null;


      }
    })
  }

  selectedTypeDiscount(value:any){
    this.type_discount = value;
  }

  selectTypeCampaing(value:any){
    this.selectedTypeCoupon(1);
    this.type_campaing = value;

  }
  selectedTypeCoupon(value:any){
    this.discount_type = value;
    this.course_selecteds = [];
    this.category_selecteds = [];
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
