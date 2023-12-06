import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  subcategories:any=[];
  subcategories_back:any=[];
  categories:any=[];
  instructors:any=[];
  requirements:any=[];
  who_is_it_fors:any=[];

  isLoading:any;

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
  who_is_it_for:any=null;

  constructor(
    public cursoService: CourseService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.cursoService.isLoading$;
    this.listarCategorias();
  }

  listarCategorias(){
    this.cursoService.listarCategorias().subscribe(
      (res:any)=>{
        this.categories = res.categories;
        this.subcategories = res.subcategories;
        this.instructors = res.instructors;
        // console.log(this.instructors);
      }
    )
  }


  selectCategory(event: any){
    let VALUE = event.target.value;
    console.log(VALUE);
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
    formData.append('who_is_it_for', this.who_is_it_fors);
    formData.append('requirements', this.requirements);

    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    this.cursoService.registerCurso(formData).subscribe(
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
            text:'El Usuario se Registró correctamente',
            caption: 'Informe',
            type:'success'
          })
          this.title = '';
          this.subtitle = '';
          this.price_usd = 0;
          this.price_bves = 0;
          this.description = null;
          this.level = null;
          this.idioma = null;
          this.user_id = null;
          this.category_id = null;
          this.sub_category_id = null;
          this.who_is_it_fors = [];
          this.requirements = [];
          this.imagenPrevisualizar = null;
        }
        
      }
    )


  }

  

  
  

}
