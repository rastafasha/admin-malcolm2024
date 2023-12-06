import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-delet',
  templateUrl: './user-delet.component.html',
  styleUrls: ['./user-delet.component.scss']
})
export class UserDeletComponent implements OnInit {
  
  @Input() user:any; //recibe la data
  @Output() userD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.userService.isLoading$;
  }

  eliminar(){
    this.userService.delete(this.user.id).subscribe(
      (res:any)=>{
        this.userD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
