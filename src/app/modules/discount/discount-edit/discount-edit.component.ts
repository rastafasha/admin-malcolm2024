import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss']
})
export class DiscountEditComponent implements OnInit {

  
  isLoading:any;
  code:any;
  type_discount:number = 1;
  discount_type:number = 1;
  discount:number = 0;
  type_campaing:number = 1;//1:normal 2flash 3banner
  start_date:any=null;
  end_date:any=null;
  state:number = 0;
  
  category_id:any = null;
  course_id:any = null;
  courses:any =[];
  categories:any =[];
  category_selecteds:any =[];
  course_selecteds:any =[];

  discount_selected:any;
  discount_id:any;

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.activatedRoute.params.subscribe((resp:any)=>{
      this.discount_id = resp.id;
    });
    this.listarConfig();
    this.showDiscount();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  showDiscount(){
    this.discountService.showDiscount(this.discount_id).subscribe((resp:any)=>{
      this.discount_selected = resp.discount;

        this.discount =this.discount_selected.discount
        this.type_discount = this.discount_selected.type_discount
        this.discount_type = this.discount_selected.discount_type
        this.type_campaing = this.discount_selected.type_campaing
        this.course_id = this.discount_selected.course_id
        this.category_id = this.discount_selected.category_id
        this.state = this.discount_selected.state
        this.start_date = this.discount_selected.start_date
        this.end_date = this.discount_selected.end_date
        
        this.course_selecteds = this.discount_selected.course_selecteds
        this.category_selecteds = this.discount_selected.category_selecteds
       
        if(this.discount_type == 1){
          this.course_selecteds = this.discount_selected.courses
        }
        if(this.discount_type == 2){
          this.category_selecteds = this.discount_selected.categories
        }

      
      console.log(resp);


    })
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
        state: this.state,
    }
    this.discountService.editarDiscount(data, this.discount_id).subscribe((res:any)=>{
      console.log(res);
      if(res.message == 403){
        this.toaster.open({
          text: res.message_text,
          caption:'VALIDACIÓN',
          type:'danger'
        });
      }else{
        this.toaster.open({
          text:'Se ha actualzado la Campaña',
          caption:'VALIDACIÓN',
          type:'success'
        });

        


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
