import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../service/categoria-portafolio.service';

@Component({
  selector: 'app-categoria-portafolio-delete',
  templateUrl: './categoria-portafolio-delete.component.html',
  styleUrls: ['./categoria-portafolio-delete.component.scss']
})
export class CategoriaPortafolioDeleteComponent implements OnInit {

  @Input() categoria:any; //recibe la data
  @Output() categoriaD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categoriaPortafolioService: CategoriaPortafolioService
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss;
    this.isLoading = this.categoriaPortafolioService.isLoading$;
  }

  

  eliminar(){
    this.categoriaPortafolioService.deleteCategory(this.categoria.id).subscribe(
      (res:any)=>{
        this.categoriaD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
