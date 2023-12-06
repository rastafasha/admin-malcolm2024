import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-class-delete',
  templateUrl: './class-delete.component.html',
  styleUrls: ['./class-delete.component.scss']
})
export class ClassDeleteComponent implements OnInit {

  @Input() claseSelected:any; //recibe la data
  @Output() claseD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public cursoService: CourseService,
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.cursoService.isLoading$;
  }

  eliminar(){
    this.cursoService.deleteClasse(this.claseSelected.id).subscribe(
      (res:any)=>{
        this.claseD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }

}
