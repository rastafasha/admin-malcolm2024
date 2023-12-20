import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaProductoService } from '../service/categoria-producto.service';

@Component({
  selector: 'app-categoria-producto-delete',
  templateUrl: './categoria-producto-delete.component.html',
  styleUrls: ['./categoria-producto-delete.component.scss']
})
export class CategoriaProductoDeleteComponent implements OnInit {

  
  @Input() category:any; //recibe la data
  @Output() categoryD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categoryService: CategoriaProductoService
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss;
    this.isLoading = this.categoryService.isLoading$;
  }

  eliminar(){
    this.categoryService.deleteCategory(this.category.id).subscribe(
      (res:any)=>{
        this.categoryD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }


}
