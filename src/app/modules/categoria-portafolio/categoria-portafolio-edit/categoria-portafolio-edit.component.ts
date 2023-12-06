import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../service/categoria-portafolio.service';

@Component({
  selector: 'app-categoria-portafolio-edit',
  templateUrl: './categoria-portafolio-edit.component.html',
  styleUrls: ['./categoria-portafolio-edit.component.scss']
})
export class CategoriaPortafolioEditComponent implements OnInit {

  @Output() categoriaE: EventEmitter<any>  = new EventEmitter();// envia la data
  @Input() CATEGORIAS:any =null;
  @Input() categoria:any =null;

  name:any =null;
  category_id:any =null;

  imagenPrevisualizar :any = './assets/media/avatars/300-6.jpg';
  filePortada:any = null;

  isLoading:any;
  selected_option: any = 1;
  id: number;
  status: any = 'PENDING';
  search:any= null;
  state:any= null;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categoriaPortafolioService: CategoriaPortafolioService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.categoriaPortafolioService.isLoading$;
    this.name = this.categoria.name;
    this.selected_option = this.categoria.category_id ? 2: 1;
    this.imagenPrevisualizar = this.categoria.imagen ? this.categoria.imagen : './assets/media/avatars/300-6.jpg' ;
    this.category_id = this.categoria.category_id;
    this.status = this.categoria.status;
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
    
    

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('status', this.status);


    this.categoriaPortafolioService.editarCategory(formData, this.categoria.id).subscribe((res:any)=>{
      console.log(res);
      this.categoriaE.emit(res.categoria);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'La Categoría se actualizo correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
      // this.listarDiscounts();
      window.location.reload();
    })


  }

  selectedOption(value:number){
    this.selected_option = value
  }

  listarDiscounts(){
    this.categoriaPortafolioService.listCategories(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.CATEGORIAS = res.categorias.data;
        console.log(this.CATEGORIAS);
      }
    )
  }

}
