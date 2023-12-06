import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  @Input() sectionSelected: any;
  @Output() sectionE: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;
  name: any= null;
  state: any= null;

  constructor(
    public modal: NgbActiveModal,
    public cursoService: CourseService,
    public toaster:Toaster,
  ) { }

  ngOnInit(): void {
    this.name = this.sectionSelected.name;
    this.state = this.sectionSelected.state;
    this.isLoading = this.cursoService.isLoading$;
    console.log(this.sectionSelected);
  }

  store(){
   

    let data = {
      state: this.state,
      name: this.name,
      // category_id: this.category.category_id.id,

    }

    this.cursoService.editarSection(data, this.sectionSelected.id).subscribe((res:any)=>{
      console.log(res);
      this.sectionE.emit(res.section);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'La Categoría se actualizo correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
      
    })
  }

}
