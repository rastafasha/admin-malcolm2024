import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Location } from '@angular/common';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  PRODUCTS:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;
  product:any;


  constructor(
    public productService: ProductService,
    public modalService: NgbModal,
    private location: Location,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.productService.isLoading$;
    this.listarProducts();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  listarProducts(){
    this.productService.listProducts(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.PRODUCTS = res.products.data;
        console.log(this.PRODUCTS);
      }
    )
  }

  eliminarProduct(product:any){
    const modalRef = this.modalService.open(ProductDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.product = product;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.productD.subscribe((res:any)=>{
      let INDEX =  this.PRODUCTS.findIndex((item:any) => item.id == res.id)
      this.PRODUCTS.splice(INDEX, 1);
      this.listarProducts();
    })

  }

  cambiarStatus(product:any){
    let VALUE = product.state;
    console.log(VALUE);
    let data ={
      state: VALUE,
    }
    this.productService.updateStatus(data, product.id).subscribe(
      resp =>{
        console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.toaster.open({
          text:'Producto Actualizado!',
          caption:'Mensaje de Validación',
          type:'success',
        })
        this.listarProducts();
      }
    )
  }


}
