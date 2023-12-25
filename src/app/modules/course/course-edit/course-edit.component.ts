import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  subcategories:any=[];
  subcategories_back:any=[];
  categories:any=[];
  salecategories:any=[];
  instructors:any=[];
  requirements:any=[];
  who_is_it_fors:any=[];

  isLoading:any;
  isUploadVideo:Boolean = false;
  state:any;

  imagenPrevisualizar :any = null;
  filePortada:any = null;

  text_regueriments:any = null;
  textWhoIsItFors:any = null;
  whoIsItFors:any = null;

  title:any=null;
  subtitle:any=null;
  price_usd:number=0;
  price_bves:number=0;
  description:any='<p>Hello World!</p>';
  level:any=null;
  idioma:any=null;
  vimeo_id:any=null;
  user_id:any=null;
  category_id:any=null;
  sub_category_id:any=null;
  category_sale_id:any=null;
  who_is_it_for:any=null;

  videocurso: any = null;
  url: any = null;

  curso_id:any=0;
  cursoSelected:any=null;

  linkVideoCourse:any = null;

  constructor(
    public cursoService: CourseService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.cursoService.isLoading$;
    this.activatedRoute.params.subscribe(
      (res:any)=>{
        this.curso_id = res.id;
        this.showCourse(this.curso_id)
      }
    )
    this.listarCategorias();
    this.listarCategoriaVentas();
  }

  showCourse(curso_id:number) {
    this.cursoService.listCurso(curso_id).subscribe(
      (res:any)=>{
        this.cursoSelected = res.course;

        this.title = this.cursoSelected.title;
        this.subtitle =this.cursoSelected.subtitle;
        this.price_usd =this.cursoSelected.price_usd;
        this.price_bves =this.cursoSelected.price_bves;
        this.description = this.cursoSelected.description;
        this.level = this.cursoSelected.level;
        this.idioma =this.cursoSelected.idioma;
        this.user_id =this.cursoSelected.user.id;
        this.category_id =this.cursoSelected.category.id;
        this.selectCategory({target:{value: this.category_id}});
        this.sub_category_id =this.cursoSelected.sub_category_id.id;
        this.who_is_it_fors = this.cursoSelected.who_is_it_for;
        this.requirements = this.cursoSelected.requirements;
        this.imagenPrevisualizar = this.cursoSelected.imagen;
        this.state = this.cursoSelected.state;
        this.category_sale_id =this.cursoSelected.category_sale.id;


        console.log(this.cursoSelected);
      }
    )
  }

  listarCategoriaVentas(){
    this.cursoService.categoriaVentas().subscribe(
      (res:any)=>{
        this.salecategories = res.salecategories;
        console.log(res);
      }
    )
  }

 


  listarCategorias(){
    this.cursoService.listarCategorias().subscribe(
      (res:any)=>{
        this.categories = res.categories;
        this.subcategories = res.subcategories;
        this.instructors = res.instructors;
      }
    )
  }


  selectCategory(event: any){
    let VALUE = event.target.value;
    // console.log(VALUE);
    this.subcategories_back = this.subcategories.filter((item:any) => item.category_id == VALUE);

  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf('image') < 0){
      this.toaster.open({
        text:'Solamante se aceptan imagenes',
        caption:'Mensaje de Validación',
        type:'danger',
      })
      return;
    }


    this.filePortada = $event.target.files[0];
    //previsualizacion de la imagen seleccionada
    let reader = new FileReader();
    reader.readAsDataURL(this.filePortada);
    reader.onloadend = () => this.imagenPrevisualizar = reader.result;
    this.cursoService.isLoadingSubject.next(true);
    //adelantar el renderizado simulando la peticion http
    setTimeout(()=>{
      this.cursoService.isLoadingSubject.next(false);

    }, 50)

}


  processVideo($event:any){
    
    if($event.target.files[0].type.indexOf("video") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN VIDEOS', caption:'MENSAJE DE VALIDACIÓN',type: 'danger'})
      return;
    }
    this.videocurso = $event.target.files[0];
  }

  uploadVideo(){
    let formData = new FormData();
    formData.append('video', this.videocurso);
    console.log('video seleccionado', this.videocurso);
    this.isUploadVideo = true;
    this.cursoService.uploadVideo(formData, this.curso_id).subscribe((resp:any)=>{
      this.isUploadVideo = false;
      console.log('video procesado',resp);
      this.linkVideoCourse = resp.link_video;
    })
  }
  

  // urlVideo(){
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.linkVideoCourse);
  // }

  urlVideo(classeSelected:any){
    let video: any[];
    let results: any[];

    if (classeSelected === null) {
        return '';
    }
    results = classeSelected.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? classeSelected : results[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + video);
  }
  



addRequirements(){
  if(!this.text_regueriments){
    this.toaster.open({
      text:'Necesitas ingresar un requerimiento',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.requirements.push(this.text_regueriments);
  this.text_regueriments = null;
}

addWhatisFor(){
  if(!this.textWhoIsItFors){
    this.toaster.open({
      text:'Necesitas ingresar un tipo de persona dirigida',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.who_is_it_fors.push(this.textWhoIsItFors);
  this.textWhoIsItFors = null;
}

removeRequirement(index:number){
  this.requirements.splice(index, 1);
}
removeWhatisFor(index:number){
  this.who_is_it_fors.splice(index, 1);
}

public onChange(event: any) {
  this.description = event.editor.getData();
}

  save(){
    
    if(!this.title
      || !this.subtitle
      || !this.price_usd
      || !this.price_bves
      || !this.description
      || !this.sub_category_id
      || !this.category_id){
        this.toaster.open({
          text:'Necesitas todos los campos requeridos',
      caption: 'Validación',
      type: 'danger'

        })
      }

    let formData = new FormData();
    formData.append('title', this.title);
    formData.append('subtitle', this.subtitle);
    formData.append('price_usd', this.price_usd+'');
    formData.append('price_bves', this.price_bves+'');
    formData.append('description', this.description);
    formData.append('level', this.level);
    formData.append('idioma', this.idioma);
    formData.append('user_id', this.user_id);
    formData.append('category_id', this.category_id);
    formData.append('sub_category_id', this.sub_category_id);
    formData.append('category_sale_id', this.category_sale_id);
    formData.append('who_is_it_for', this.who_is_it_fors);
    formData.append('requirements', this.requirements);
    formData.append('state', this.state);
    
    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    this.cursoService.editarCurso(formData, this.curso_id).subscribe(
      (resp:any)=>{
        console.log(resp);
        if(resp.message == 403){
          this.toaster.open({
            text: resp.message,
            caption: 'Validación',
            type: 'danger'
          })
        }else{
          this.toaster.open({
            text:'El Curso se Actualizó correctamente',
            caption: 'Informe',
            type:'success'
          })
        }
        
      }
    )


  }

  
}
