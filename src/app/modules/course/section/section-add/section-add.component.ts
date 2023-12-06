import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {

  course_id: any;
  isLoading:any;
  name:any;
  sections: any = [];

  constructor(
    public cursoService: CourseService,
    public activatedRoute:ActivatedRoute,
    public toaster:Toaster,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.cursoService.isLoading$;
    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.course_id = resp.id;
    })

    this.listarSecciones();
  }

  listarSecciones(){
    this.cursoService.listSections(this.course_id).subscribe((res:any)=>{
      console.log(res);
      this.sections = res.sections;
    })
  }

  save(){

    if(!this.name){
      this.toaster.open({
        text: 'Necesitas ingresar un nombre',
        caption: 'VALIDACION',
        type: 'danger'
      })
      return;
    }
    let data = {
      name: this.name,
      course_id: this.course_id,
      state: 1
    }

    this.cursoService.registerSection(data).subscribe((res:any)=>{
      console.log(res);
      
      this.name = null;
      this.sections.push(res.section);

      this.toaster.open({
        text: 'La Sección se registró correctamente',
        caption: 'SUCCESS',
        type: 'primary'
      })
    })
  }

  editSection(section: any){
    const modalRef = this.modalService.open(SectionEditComponent, {
      centered:true,
      size:'md'
    });
    modalRef.componentInstance.sectionSelected = section;
    modalRef.componentInstance.sectionE.subscribe((newSection:any)=>{
      let INDEX = this.sections.findIndex((item:any)=> item.id == newSection.id);
      if(INDEX){
        this.sections[INDEX]  = newSection;
      }
    })
  }

  deleteSection(section:any){
    const modalRef = this.modalService.open(SectionDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.section = section;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.sectionD.subscribe((res:any)=>{
      let INDEX =  this.sections.findIndex((item:any) => item.id == res.id)
      this.sections.splice(INDEX, 1);
    })

  }

}
