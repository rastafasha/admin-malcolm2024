import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaPortafolioService } from '../service/categoria-portafolio.service';
import { CategoriaPortafolio } from '../categoria-portafolio.model';
import { CategoriaPortafolioAddComponent } from '../categoria-portafolio-add/categoria-portafolio-add.component';
import { CategoriaPortafolioDeleteComponent } from '../categoria-portafolio-delete/categoria-portafolio-delete.component';
import { CategoriaPortafolioEditComponent } from '../categoria-portafolio-edit/categoria-portafolio-edit.component';
import { Toaster } from 'ngx-toast-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-portafolio-list',
  templateUrl: './categoria-portafolio-list.component.html',
  styleUrls: ['./categoria-portafolio-list.component.scss']
})
export class CategoriaPortafolioListComponent implements OnInit {

  // categorias:any = CategoriaPortafolio;
  CATEGORIAS:any;
  id: number;
  name: string;
  isLoading: any = null;
  search:any= null;
  state:any= null;
  status:any= null;

  constructor(
    public toaster: Toaster,
    public modalService: NgbModal,
    private location: Location,
    public categoriaPortafolioService: CategoriaPortafolioService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.categoriaPortafolioService.isLoading$;
    this.listarDiscounts();
    this.getCategories();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  
  listarDiscounts(){
    this.categoriaPortafolioService.listCategories(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.CATEGORIAS = res.categorias.data;
        console.log(this.CATEGORIAS);
      }
    )
  }

  getCategories(): void {
    // return this.planesService.carga_info();
    // this.categoriaPortafolioService.getCategories().subscribe(
    //   res =>{
    //     this.categorias = res;
    //     console.log(this.categorias);
    //   }
    // );
  }

  openModalCreateCategory(){
    const modalRef = this.modalService.open(CategoriaPortafolioAddComponent,{centered: true, size:'md'});
    modalRef.componentInstance.CATEGORIAS = this.CATEGORIAS.filter((categoria:any) => !categoria.category_id);
    // recibe el usuario editado por medio de ouput desde crear
    modalRef.componentInstance.categoriaC.subscribe((Categoria:any)=>{
      console.log(Categoria);
      this.CATEGORIAS.unshift(Categoria);
      this.listarDiscounts();
    })

  }

  


  editCategory(categoria:any){
    const modalRef = this.modalService.open(CategoriaPortafolioEditComponent,{centered: true, size:'md'})
    modalRef.componentInstance.categoria = categoria;
    modalRef.componentInstance.CATEGORIAS = this.CATEGORIAS.filter((categoria:any) => !categoria.category_id);
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoriaE.subscribe((Categoria:any)=>{
      let INDEX =  this.CATEGORIAS.findIndex((item:any) => item.id == Categoria.id)
      this.CATEGORIAS[INDEX] = Categoria;
    })

   }

  eliminarCategory(categoria:any){
    const modalRef = this.modalService.open(CategoriaPortafolioDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.categoria = categoria;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.categoriaD.subscribe((res:any)=>{
      let INDEX =  this.CATEGORIAS.findIndex((item:any) => item.id == res.id)
      this.CATEGORIAS.splice(INDEX, 1);
    })

  }

  cambiarStatus(categoria:any){
    this.categoriaPortafolioService.updateStatus(categoria).subscribe(
      resp =>{ console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.toaster.open({
          text:'El Status se Actualizado correctamente',
          caption: 'Informe',
          type:'success'
        })
        this.listarDiscounts();
      }
    )
  }


}
