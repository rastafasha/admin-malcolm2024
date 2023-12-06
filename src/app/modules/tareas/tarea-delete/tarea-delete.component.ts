import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { TareaService } from '../service/tarea.service';

@Component({
  selector: 'app-tarea-delete',
  templateUrl: './tarea-delete.component.html',
  styleUrls: ['./tarea-delete.component.scss']
})
export class TareaDeleteComponent implements OnInit {

  @Input() todo:any; //recibe la data
  @Output() todoD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public tareaService: TareaService
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss;
    this.isLoading = this.tareaService.isLoading$;
  }

  eliminar(){
    this.tareaService.delete(this.todo.id).subscribe(
      (res:any)=>{
        this.todoD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
        
      }
    )
  }
}
