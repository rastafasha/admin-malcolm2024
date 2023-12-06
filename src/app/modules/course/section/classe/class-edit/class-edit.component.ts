import { Component, EventEmitter, Input, OnInit, Output, Sanitizer } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../../service/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ClassDeleteFileComponent } from '../class-delete-file/class-delete-file.component';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.scss']
})
export class ClassEditComponent implements OnInit {

  @Input() claseSelected: any;
  @Output() claseE: EventEmitter<any>  = new EventEmitter();// envia la data

  clases:any=[];
  isLoading:any;
  name:any;
  state:any = 1;
  vimeo_id:any;
  course_section_id:any;
  section_id:any;
  time:any;

  FILES:any = [];
  FILES_CLASE:any = [];


  description:any='<p>Hello World!</p>';
  imagenPrevisualizar :any = null;
  filePortada:any = null;

  isUploadVideo:Boolean = false;
  isUploadFile:Boolean = false;
  videocurso: any = null;
  link_video_course: any = null;

  constructor(
    public modal: NgbActiveModal,
    public cursoService: CourseService,
    public toaster:Toaster,
    public sanitizer: DomSanitizer,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.claseSelected.isLoading$;
    this.name = this.claseSelected.name;
    this.description = this.claseSelected.description;
    this.state = this.claseSelected.state;
    this.FILES_CLASE = this.claseSelected.files;
    this.link_video_course = this.claseSelected.vimeo_id;
    console.log(this.claseSelected);
    this.listarClasessFiles();
  }

  listarClasessFiles(){
    this.cursoService.listClasses(this.section_id).subscribe((res:any)=>{
      console.log(res);
      this.clases = res.clases.data;
    })
  }

  


  save(){
   

    let data = {
      name: this.name,
      description: this.description,
      state: this.state

    }

    this.cursoService.editarClasse(data, this.claseSelected.id).subscribe((res:any)=>{
      console.log(res);
      this.claseE.emit(res.section);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'La Clase se actualizó correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
    })
  }

  public onChange(event: any) {
    this.description = event.editor.getData();
  }

  processFile($event:any){
    for (const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES);
  
  }

  deleteFile(FILE:any){
    const modalRef = this.modalService.open(ClassDeleteFileComponent,{centered: true, size:'sm'})
    modalRef.componentInstance.fileSelected = FILE;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.clasefileD.subscribe((res:any)=>{
      let INDEX = this.FILES_CLASE.findIndex((item:any) => item.id == res.id)
      this.FILES_CLASE.splice(INDEX, 1);
    })

  }

  processVideo($event:any){
    console.log($event.target.files[0].type);
    console.log($event.target.files[0]);
    if($event.target.files[0].type.indexOf('video') < 0){
      this.toaster.open({
        text:'Solamante se aceptan imagenes',
        caption:'Mensaje de Validación',
        type:'danger',
      })
      return;
    }
    this.videocurso = $event.target.files[0];
  }

  uploadVideo(){
    let formData = new FormData();
    formData.append('video', this.videocurso);
    console.log(this.videocurso);
    this.isUploadVideo = true;

    this.cursoService.uploadVideoClasse(formData, this.claseSelected.id).subscribe((resp:any)=>{
      console.log(resp);
      this.isUploadVideo = false;
    })
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_course)
  }

  // urlVideo(classeSelected:any){
  //   // return this.sanitizer.bypassSecurityTrustResourceUrl(classeSelected.vimeo)

  //   let video: any[];
  //   let results: any[];

  //   if (classeSelected === null) {
  //       return '';
  //   }
  //   results = classeSelected.match('[\\?&]v=([^&#]*)');
  //   video   = (results === null) ? classeSelected : results[1];

  //   // return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  //   return this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + video);
  // }
  

  uploadFile(){
    if(this.FILES.length === 0){
      this.toaster.open({
        text:'Necesitas subir un recurso de la clase',
        caption:'VALIDACIÓN',
        type:'danger'
      });
      return;

    }
    let formData = new FormData();  
    formData.append("course_clase_id", this.claseSelected.id);

    this.FILES.forEach((file:any, index:number)=>{
      formData.append("files["+index+"]", file);
    });

    this.isUploadFile = true;

    this.cursoService.registerClasseFile(formData).subscribe((resp:any)=>{
      console.log(resp);
      this.isUploadFile = false;
      this.modal.close();
      this.claseE.emit(resp.clase);
    })
  }
  

}
