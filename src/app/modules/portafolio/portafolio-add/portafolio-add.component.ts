import { Component, OnInit, Input } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../../categoria-portafolio/service/categoria-portafolio.service';
import { PortafolioService } from '../service/portafolio.service';
import { CategoriaPortafolio } from '../../categoria-portafolio/categoria-portafolio.model';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../user/service/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portafolio-add',
  templateUrl: './portafolio-add.component.html',
  styleUrls: ['./portafolio-add.component.scss']
})
export class PortafolioAddComponent implements OnInit {
  @Input() user:any; //recibe la data
  categorias:any;
  // categorias: any= CategoriaPortafolio;
  instructors:any=[];

  isLoading:any;

  imagenPrevisualizar :any = null;
  filePortada:any = null;

  youtubeurl:any= null;
  technology:any= null;
  popup:any= null;
  isFeatured:any= null;
  url:any= null;

  title:any=null;
  description:any='<p>Hello World!</p>';
  vimeo_id:any=null;
  user_id:any;
  category_id:any=null;
  // user:any = null;

  constructor(
    public portafolioService: PortafolioService,
    public categoriaPortafolioService: CategoriaPortafolioService,
    public userService: UserService,
    public toaster: Toaster,
    public router: Router,
    public authService: AuthService,
    private location: Location,
  ) { 
    // this.user = this.authService.currentUser$;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.authService.user;
    this.isLoading = this.portafolioService.isLoading$;
    this.listarCategorias();
    this.getUser();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getUser(){
    this.userService.getUser('1').subscribe((resp:any)=>{
      this.user = resp.user[0];
      console.log(this.user);
    })
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
    console.log(VALUE);

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


public onChange(event: any) {
  this.description = event.editor.getData();
}

  save(){
    
    if(!this.title
      || !this.popup
      || !this.isFeatured
      || !this.description
      || !this.category_id){
        this.toaster.open({
          text:'Necesitas todos los campos requeridos',
      caption: 'Validación',
      type: 'danger'

        })
      }

    let formData = new FormData();
    formData.append('title', this.title);
    formData.append('youtubeurl', this.youtubeurl);
    formData.append('url', this.url);
    formData.append('popup', this.popup);
    formData.append('isFeatured', this.isFeatured);
    formData.append('description', this.description);
    formData.append('user_id', this.user.id);
    formData.append('category_id', this.category_id);

    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    this.portafolioService.registerPortafolio(formData).subscribe(
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
          this.description = null;
          this.url = null;
          this.youtubeurl = null;
          this.popup = null;
          this.isFeatured = null;
          this.user_id = null;
          this.category_id = null;
          this.imagenPrevisualizar = null;
          this.router.navigateByUrl("/portafolio/list");
        }
        
      }
    )


  }

  


}
