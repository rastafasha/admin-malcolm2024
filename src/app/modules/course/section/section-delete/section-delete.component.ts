import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {

  @Input() sectionSelected:any; //recibe la data
  @Output() sectionD: EventEmitter<any>  = new EventEmitter();// envia la data

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
    this.cursoService.deleteSection(this.sectionSelected.id).subscribe(
      (res:any)=>{
        if(res.message == 403){
          this.toaster.open({
            text: res.message_text,
            caption: 'VALIDACIÓN',
            type: 'danger'
          })
          return;
        }else{
          this.sectionD.emit('');//envia la data borrado del hijo al padre como borrado
           this.modal.dismiss(); 
        }
        
      }
    )
  }

}
