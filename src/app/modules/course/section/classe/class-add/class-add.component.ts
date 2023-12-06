import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../../service/course.service';
import { ClassEditComponent } from '../class-edit/class-edit.component';
import { ClassDeleteComponent } from '../class-delete/class-delete.component';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit {

  clases:any=[];
  isLoading:any;
  name:any;
  state:any;
  vimeo_id:any;
  course_section_id:any;
  section_id:any;
  time:any;

  FILES:any = [];


  description:any='<p>Hello World!</p>';
  imagenPrevisualizar :any = null;
  filePortada:any = null;

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
      this.section_id = resp.id;
    })

    this.listarClasess();
  }

  public onChange(event: any) {
    this.description = event.editor.getData();
  }
  

  listarClasess(){
    this.cursoService.listClasses(this.section_id).subscribe((res:any)=>{
      console.log(res);
      this.clases = res.clases.data;
    })
  }


  processFile($event:any){
    for (const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES);
  
  }
  
  

  save(){
    if(!this.name){
      this.toaster.open({
        text:'Necesitas ingresar un titulo de la clase',
        caption:'VALIDACIÓN',
        type:'danger'
      });
      return;

    }

    if(this.FILES.length === 0){
      this.toaster.open({
        text:'Necesitas subir un recurso de la clase',
        caption:'VALIDACIÓN',
        type:'danger'
      });
      return;

    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('course_section_id', this.section_id);

    this.FILES.forEach((file:any, index:number)=>{
      formData.append("files["+index+"]", file);
    });


    this.cursoService.registerClasse(formData).subscribe((res:any)=>{
      console.log(res);
      this.toaster.open({
        text:'La Clase se ha creado satisfactoriamiente',
        caption:'SUCCESS',
        type:'success'
      });
      this.clases.push(res.clase);
      this.name = null;
      this.description = null;
      this.FILES = [];
    })

  }

  editClase(classe:any){
    const modalRef = this.modalService.open(ClassEditComponent, {centered: true, size:'md'});
    modalRef.componentInstance.claseSelected = classe;
    modalRef.componentInstance.claseE.subscribe((clase:any)=>{
      let INDEX = this.clases.findIndex((item:any)=> item.id == clase.id);
      this.clases[INDEX] = clase;
    })
    
  }

  deleteClase(classe:any){
    const modalRef = this.modalService.open(ClassDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.claseSelected = classe;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.claseD.subscribe((res:any)=>{
      let INDEX = this.clases.findIndex((item:any) => item.id == res.id)
      this.clases.splice(INDEX, 1);
    })
  }
}
