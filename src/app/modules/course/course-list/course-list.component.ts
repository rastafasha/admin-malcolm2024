import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  COURSES:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;



  constructor(
    public cursoService: CourseService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.cursoService.isLoading$;
    this.listarCursos();
  }
  listarCursos(){
    this.cursoService.listCursos(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.COURSES = res.courses.data;
        // console.log(this.COURSES);
      }
    )
  }

  eliminarCurso(curso:any){
    const modalRef = this.modalService.open(CourseDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.curso = curso;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.cursoD.subscribe((res:any)=>{
      let INDEX =  this.COURSES.findIndex((item:any) => item.id == res.id)
      this.COURSES.splice(INDEX, 1);
      this.listarCursos();
    })

  }
}
