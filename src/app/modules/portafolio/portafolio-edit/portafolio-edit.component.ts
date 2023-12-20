import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../../categoria-portafolio/service/categoria-portafolio.service';
import { PortafolioService } from '../service/portafolio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-portafolio-edit',
  templateUrl: './portafolio-edit.component.html',
  styleUrls: ['./portafolio-edit.component.scss']
})
export class PortafolioEditComponent implements OnInit {

  
  categorias:any;
  portafolio:any=[];

  isLoading:any;
  isUploadVideo:Boolean = false;
  
  imagenPrevisualizar :any = null;
  filePortada:any = null;
  
  youtubeurl:any = null;
  url:any = null;
  popup:any = null;
  isFeatured:any=null;
  technology:any=null;
  status:any;

  title:any=null;
  description:any='<p>Hello World!</p>';
  idioma:any=null;
  vimeo_id:any=null;
  user_id:any=null;
  category_id:any=null;

  videocurso: any = null;

  portafolio_id:any=0;
  portafolioSelected:any=null;

  linkVideoCourse:any = null;

  constructor(
    public portafolioService: PortafolioService,
    public categoriaPortafolioService: CategoriaPortafolioService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.portafolioService.isLoading$;
    this.activatedRoute.params.subscribe(
      (res:any)=>{
        this.portafolio_id = res.id;
        this.showCourse(this.portafolio_id)
      }
    )
    this.listarCategorias();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  showCourse(portafolio_id:number) {
    this.portafolioService.listPortafolio(portafolio_id).subscribe(
      (res:any)=>{
        this.portafolioSelected = res.portafolio;

        this.title = this.portafolioSelected.title;
        this.youtubeurl =this.portafolioSelected.youtubeurl;
        this.url =this.portafolioSelected.url;
        this.popup =this.portafolioSelected.popup;
        this.isFeatured = this.portafolioSelected.isFeatured;
        this.description = this.portafolioSelected.description;
        this.user_id =this.portafolioSelected.user_id;
        this.category_id =this.portafolioSelected.categorias.id;
        this.selectCategory({target:{value: this.category_id}});
        this.imagenPrevisualizar = this.portafolioSelected.imagen;
        this.status = this.portafolioSelected.status;


        console.log(this.portafolioSelected);
      }
    )
  }

 


  listarCategorias(){
    this.categoriaPortafolioService.getCategoriesActivas().subscribe(
      (res:any)=>{
        this.categorias = res;
        console.log(this.categorias);
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
    this.portafolioService.isLoadingSubject.next(true);
    //adelantar el renderizado simulando la peticion http
    setTimeout(()=>{
      this.portafolioService.isLoadingSubject.next(false);

    }, 50)

}


  processVideo($event:any){
    
    if($event.target.files[0].type.indexOf("video") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN VIDEOS', caption:'MENSAJE DE VALIDACIÓN',type: 'danger'})
      return;
    }
    this.videocurso = $event.target.files[0];
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
    formData.append('isFeatured', this.isFeatured);
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


    this.portafolioService.editarPortafolio(formData, this.portafolio_id).subscribe(
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
            text:'El Proyecto se Actualizó correctamente',
            caption: 'Informe',
            type:'success'
          })
          this.ngOnInit();
        }
        
      }
    )


  }

}
