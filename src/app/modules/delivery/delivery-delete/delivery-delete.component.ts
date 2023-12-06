import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-delete',
  templateUrl: './delivery-delete.component.html',
  styleUrls: ['./delivery-delete.component.scss']
})
export class DeliveryDeleteComponent implements OnInit {

  @Input() delivery:any; //recibe la data
  @Output() deliveryD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss;
    this.isLoading = this.deliveryService.isLoading$;
  }

  eliminar(){
    this.deliveryService.eliminar(this.delivery.id).subscribe(
      (res:any)=>{
        this.deliveryD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
        
      }
    )
  }

}
