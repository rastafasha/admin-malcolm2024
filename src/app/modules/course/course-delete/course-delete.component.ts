import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent implements OnInit {

  @Input() curso:any; //recibe la data
  @Output() cursoD: EventEmitter<any>  = new EventEmitter();// envia la data

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
    this.cursoService.deleteCurso(this.curso.id).subscribe(
      (res:any)=>{
        this.cursoD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }
}
