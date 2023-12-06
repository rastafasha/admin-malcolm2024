import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { PortafolioService } from '../service/portafolio.service';

@Component({
  selector: 'app-portafolio-delete',
  templateUrl: './portafolio-delete.component.html',
  styleUrls: ['./portafolio-delete.component.scss']
})
export class PortafolioDeleteComponent implements OnInit {

  @Input() portafolio:any; //recibe la data
  @Output() portafolioD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public portafolioService: PortafolioService,
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.portafolioService.isLoading$;
  }

  eliminar(){
    this.portafolioService.deletePortafolio(this.portafolio.id).subscribe(
      (res:any)=>{
        this.portafolioD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
