import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaAddComponent } from '../categoria-add/categoria-add.component';
import { CategoriaEditComponent } from '../categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from '../categoria-delete/categoria-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  CATEGORIES:any;
  isLoading: any = null;
  search:any= null;
  state:any= null;

  constructor(
    public modalService: NgbModal,
    public categoryService: CategoriaService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.categoryService.isLoading$;
    this.listarCategorys();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listarCategorys(){
    this.categoryService.listCategories(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.CATEGORIES = res.categories.data;
        console.log(this.CATEGORIES);
      }
    )
  }

  openModalCreateCategory(){
    const modalRef = this.modalService.open(CategoriaAddComponent,{centered: true, size:'md'});
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => !category.category_id);
    // recibe el usuario editado por medio de ouput desde crear
    modalRef.componentInstance.categoryC.subscribe((Category:any)=>{
      console.log(Category);
      this.CATEGORIES.unshift(Category);
      this.listarCategorys();
    })

  }

  


  editCategory(category:any){
    const modalRef = this.modalService.open(CategoriaEditComponent,{centered: true, size:'md'})
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => !category.category_id);
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoryE.subscribe((Category:any)=>{
      let INDEX =  this.CATEGORIES.findIndex((item:any) => item.id == Category.id)
      this.CATEGORIES[INDEX] = Category;
    })

   }
  eliminarCategory(category:any){
    const modalRef = this.modalService.open(CategoriaDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.category = category;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoryD.subscribe((res:any)=>{
      let INDEX =  this.CATEGORIES.findIndex((item:any) => item.id == res.id)
      this.CATEGORIES.splice(INDEX, 1);
    })

  }

}
