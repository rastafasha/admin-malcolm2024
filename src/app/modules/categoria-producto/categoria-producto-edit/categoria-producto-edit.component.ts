import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaProductoService } from '../service/categoria-producto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-categoria-producto-edit',
  templateUrl: './categoria-producto-edit.component.html',
  styleUrls: ['./categoria-producto-edit.component.scss']
})
export class CategoriaProductoEditComponent implements OnInit {

  @Output() categoryE: EventEmitter<any>  = new EventEmitter();// envia la data
  @Input() CATEGORIES:any =null;
  @Input() category:any =null;

  nombre:any =null;
  category_product_id:any =null;

  imagenPrevisualizar :any = './assets/media/avatars/300-6.jpg';
  filePortada:any = null;

  isLoading:any;
  selected_option: any = 1;
  id: number;
  state: any = 1;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categoryService: CategoriaProductoService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.categoryService.isLoading$;
    this.nombre = this.category.nombre;
    this.selected_option = this.category.category_id ? 2: 1;
    this.imagenPrevisualizar = this.category.imagen ? this.category.imagen : './assets/media/avatars/300-6.jpg' ;
    this.category_product_id = this.category.category_product_id;
    this.state = this.category.state;
  }

  processAvatar($event:any){
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

  }

  store(){
    if(this.selected_option == 1){
      if(!this.nombre){
          this.toaster.open({
            text:'Necesitas llenar todos los Campos',
            caption: 'Validación',
            type:'danger'
          })
          return;
        }
    }

    if(this.selected_option == 2){
      if(!this.nombre
        || !this.category_product_id){
          this.toaster.open({
            text:'Necesitas llenar todos los Campos',
            caption: 'Validación',
            type:'danger'
          })
          return;
        }
    }
    

    let formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('state', this.state);

    if(this.category_product_id){
      formData.append('category_id', this.category_product_id);
    }
    if(this.filePortada){
      formData.append('portada', this.filePortada);
    }

    // const data = {
    //   imagen: this.filePortada,
    //   state: this.state,
    //   nombre: this.nombre,
    //   category_id: this.category.category_id.id,

    // }

    this.categoryService.editarCategory(formData, this.category.id).subscribe((res:any)=>{
      console.log(res);
      this.categoryE.emit(res.category);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'La Categoría se actualizo correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
      
    })


  }

  selectedOption(value:number){
    this.selected_option = value
  }
}
