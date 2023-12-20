import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from '../service/categoria-producto.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaProductoAddComponent } from '../categoria-producto-add/categoria-producto-add.component';
import { CategoriaProductoDeleteComponent } from '../categoria-producto-delete/categoria-producto-delete.component';
import { CategoriaProductoEditComponent } from '../categoria-producto-edit/categoria-producto-edit.component';
@Component({
  selector: 'app-categoria-producto-list',
  templateUrl: './categoria-producto-list.component.html',
  styleUrls: ['./categoria-producto-list.component.scss']
})
export class CategoriaProductoListComponent implements OnInit {

  
  CATEGORIES:any;
  isLoading: any = null;
  search:any= null;
  state:any= null;

  constructor(
    public modalService: NgbModal,
    public categoryProductoService: CategoriaProductoService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.categoryProductoService.isLoading$;
    this.listarCategorys();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listarCategorys(){
    this.categoryProductoService.listCategories(this.search, this.state).subscribe(
      (res:any)=>{
        console.log(res);
        this.CATEGORIES = res.category_products.data;
        // console.log(this.CATEGORIES);
      }
    )
  }

  openModalCreateCategory(){
    const modalRef = this.modalService.open(CategoriaProductoAddComponent,{centered: true, size:'md'});
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => !category.category_id);
    // recibe el usuario editado por medio de ouput desde crear
    modalRef.componentInstance.categoryC.subscribe((Category:any)=>{
      console.log(Category);
      this.CATEGORIES.unshift(Category);
      this.listarCategorys();
    })

  }

  


  editCategory(category:any){
    const modalRef = this.modalService.open(CategoriaProductoEditComponent,{centered: true, size:'md'})
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => !category.category_id);
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoryE.subscribe((Category:any)=>{
      let INDEX =  this.CATEGORIES.findIndex((item:any) => item.id == Category.id)
      this.CATEGORIES[INDEX] = Category;
      this.listarCategorys();
    })

   }
  eliminarCategory(category:any){
    const modalRef = this.modalService.open(CategoriaProductoDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.category = category;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoryD.subscribe((res:any)=>{
      let INDEX =  this.CATEGORIES.findIndex((item:any) => item.id == res.id)
      this.CATEGORIES.splice(INDEX, 1);
      this.listarCategorys();
    })

  }

}
