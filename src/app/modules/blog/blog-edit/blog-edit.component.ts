import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../../categoria-portafolio/service/categoria-portafolio.service';
import { BlogService } from '../services/blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  
  subcategories:any=[];
  subcategories_back:any=[];
  categories:any=[];
  blog:any=[];

  isLoading:any;
  isUploadVideo:Boolean = false;
  
  imagenPrevisualizar :any = null;
  filePortada:any = null;
  
  status:any;

  youtubeurl:any= null;
  technology:any= null;
  popup:any= null;
  url:any= null;

  title:any=null;
  description:any='<p>Hello World!</p>';
  idioma:any=null;
  vimeo_id:any=null;
  user_id:any=null;
  category_id:any=null;

  videocurso: any = null;

  blog_id:any=0;
  blogSelected:any=null;

  linkVideoCourse:any = null;

  constructor(
    public blogService: BlogService,
    public categoriaPortafolioService: CategoriaPortafolioService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.blogService.isLoading$;
    this.activatedRoute.params.subscribe(
      (res:any)=>{
        this.blog_id = res.id;
        this.showCourse(this.blog_id)
      }
    )
    this.listarCategorias();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  showCourse(blog_id:number) {
    this.blogService.listBlog(blog_id).subscribe(
      (res:any)=>{
        this.blogSelected = res.blog;

        this.title = this.blogSelected.title;
        this.youtubeurl =this.blogSelected.youtubeurl;
        this.url =this.blogSelected.url;
        this.popup =this.blogSelected.popup;
        this.description = this.blogSelected.description;
        this.user_id =this.blogSelected.user_id;
        this.category_id =this.blogSelected.category.id;
        this.selectCategory({target:{value: this.category_id}});
        this.imagenPrevisualizar = this.blogSelected.imagen;
        this.status = this.blogSelected.status;


        console.log(this.blogSelected);
      }
    )
  }

 


  listarCategorias(){
    this.blogService.listarCategorias().subscribe(
      (res:any)=>{
        this.categories = res;
        console.log(this.categories);
      }
    )
  }



  selectCategory(event: any){
    let VALUE = event.target.value;

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
    this.blogService.isLoadingSubject.next(true);
    //adelantar el renderizado simulando la peticion http
    setTimeout(()=>{
      this.blogService.isLoadingSubject.next(false);

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
    // let formData = new FormData();
    // formData.append('video', this.videocurso);
    // console.log('video seleccionado', this.videocurso);
    // this.isUploadVideo = true;
    // this.portafolioService.uploadVideo(formData, this.curso_id).subscribe((resp:any)=>{
    //   this.isUploadVideo = false;
    //   console.log('video procesado',resp);
    //   this.linkVideoCourse = resp.link_video;
    // })
  }
  

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
  





public onChange(event: any) {
  this.description = event.editor.getData();
}

  save(){
    
    if(!this.title || !this.popup){
        this.toaster.open({
          text:'Necesitas todos los campos requeridos',
      caption: 'Validación',
      type: 'danger'

        })
      }

    let formData = new FormData();
    // formData.append('title', this.title);
    formData.append('youtubeurl', this.youtubeurl);
    formData.append('url', this.url);
    formData.append('popup', this.popup);
    formData.append('description', this.description);
    formData.append('user_id', this.user_id);
    formData.append('category_id', this.category_id);
    formData.append('status', this.status);
    
    if(this.title){
      formData.append('title', this.title);
    }
    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    this.blogService.editarBlog(formData, this.blog_id).subscribe(
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
