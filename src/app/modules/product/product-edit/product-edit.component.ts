import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  salecategories:any=[];
  subcategories:any=[];
  subcategories_back:any=[];
  category_products:any=[];
  instructors:any=[];
  requirements:any=[];
  who_is_it_fors:any=[];
  colors:any=[];
  peso:any=[];
  medida:any=[];
  material:any=[];

  isLoading:any;
  isUploadVideo:Boolean = false;
  state:any;

  imagenPrevisualizar :any = null;
  filePortada:any = null;

  text_regueriments:any = null;
  textWhoIsItFors:any = null;
  whoIsItFors:any = null;
  text_colors:any = null;
  text_materials:any = null;
  text_pesos:any = null;
  text_medidas:any = null;

  title:any=null;
  subtitle:any=null;
  price_usd:number=0;
  price_bves:number=0;
  description:any='<p>Hello World!</p>';
  level:any=null;
  idioma:any=null;
  vimeo_id:any=null;
  user_id:any=null;
  category_product_id:any=null;
  sub_category_id:any=null;
  who_is_it_for:any=null;
  category_sale_id:any=null;

  videocurso: any = null;
  url: any = null;

  product_id:any=0;
  productSelected:any=null;

  linkVideoCourse:any = null;

  constructor(
    public productService: ProductService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.productService.isLoading$;
    this.activatedRoute.params.subscribe(
      (res:any)=>{
        this.product_id = res.id;
        this.showCourse(this.product_id)
      }
    )
    this.listarCategorias();
    this.listarCategoriaVentas();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listarCategoriaVentas(){
    this.productService.categoriaVentas().subscribe(
      (res:any)=>{
        this.salecategories = res.salecategories;
        console.log(res);
      }
    )
  }

  showCourse(product_id:number) {
    this.productService.listProduct(product_id).subscribe(
      (res:any)=>{
        this.productSelected = res.product;

        this.title = this.productSelected.title;
        this.subtitle =this.productSelected.subtitle;
        this.price_usd =this.productSelected.price_usd;
        this.price_bves =this.productSelected.price_bves;
        this.description = this.productSelected.description;
        this.user_id =this.productSelected.user.id;
        this.category_product_id =this.productSelected.categories_product.id;
        this.sub_category_id =this.productSelected.sub_category.id;
        this.selectCategory({target:{value: this.category_product_id}});
        this.who_is_it_fors = this.productSelected.who_is_it_for;
        this.requirements = this.productSelected.requirements;
        this.colors = this.productSelected.colors;
        this.medida = this.productSelected.medida;
        this.material = this.productSelected.material;
        this.peso = this.productSelected.peso;
        this.imagenPrevisualizar = this.productSelected.imagen;
        this.state = this.productSelected.state;
        this.category_sale_id =this.productSelected.category_sale_id;


        console.log(this.productSelected);
      }
    )
  }

 


  listarCategorias(){
    this.productService.listarCategorias().subscribe(
      (res:any)=>{
        this.category_products = res.category_products;
        this.subcategories = res.subcategories;
        this.instructors = res.instructors;
        console.log(res);
      }
    )
  }


  selectCategory(event: any){
    let VALUE = event.target.value;
    console.log(VALUE);
    this.subcategories_back = this.subcategories.filter((item:any) => item.category_product_id == VALUE);

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
    this.productService.isLoadingSubject.next(true);
    //adelantar el renderizado simulando la peticion http
    setTimeout(()=>{
      this.productService.isLoadingSubject.next(false);

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
    this.productService.uploadVideo(formData, this.product_id).subscribe((resp:any)=>{
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





addColors(){
  if(!this.text_colors){
    this.toaster.open({
      text:'Necesitas ingresar un requerimiento',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.colors.push(this.text_colors);
  this.text_colors = null;
}
removeColor(index:number){
  this.colors.splice(index, 1);
}
addMaterials(){
  if(!this.text_materials){
    this.toaster.open({
      text:'Necesitas ingresar un requerimiento',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.material.push(this.text_materials);
  this.text_materials = null;
}
removeMaterial(index:number){
  this.material.splice(index, 1);
}
addPesos(){
  if(!this.text_pesos){
    this.toaster.open({
      text:'Necesitas ingresar un requerimiento',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.peso.push(this.text_pesos);
  this.text_pesos = null;
}
removePeso(index:number){
  this.peso.splice(index, 1);
}
addMedidas(){
  if(!this.text_medidas){
    this.toaster.open({
      text:'Necesitas ingresar un requerimiento',
      caption: 'Validación',
      type: 'danger'
    })
    return false;
  }
  this.medida.push(this.text_medidas);
  this.text_medidas = null;
}
removeMedida(index:number){
  this.medida.splice(index, 1);
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
      || !this.category_product_id){
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
    formData.append('user_id', this.user_id);
    formData.append('category_product_id', this.category_product_id);
    formData.append('sub_category_id', this.sub_category_id);
    formData.append('category_sale_id', this.category_sale_id);
    formData.append('who_is_it_for', this.who_is_it_fors);
    formData.append('requirements', this.requirements);
    formData.append('colors', this.colors);
    formData.append('medida', this.medida);
    formData.append('peso', this.peso);
    formData.append('material', this.material);
    formData.append('state', this.state);
    
    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    this.productService.editarProduct(formData, this.product_id).subscribe(
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
            text:'El Producto se Actualizó correctamente',
            caption: 'Informe',
            type:'success'
          })
          this.ngOnInit();
          // window.location.reload();
        }
        
      }
    )


  }

  
}



