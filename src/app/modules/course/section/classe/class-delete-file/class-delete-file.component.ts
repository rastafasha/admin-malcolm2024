import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-class-delete-file',
  templateUrl: './class-delete-file.component.html',
  styleUrls: ['./class-delete-file.component.scss']
})
export class ClassDeleteFileComponent implements OnInit {

  @Input() fileSelected:any; //recibe la data
  @Output() clasefileD: EventEmitter<any>  = new EventEmitter();// envia la data

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
    this.cursoService.deleteClasseFile(this.fileSelected.id).subscribe(
      (res:any)=>{
        this.clasefileD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }
}
