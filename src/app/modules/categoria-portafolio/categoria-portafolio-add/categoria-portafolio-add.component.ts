import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoriaPortafolioService } from '../service/categoria-portafolio.service';

@Component({
  selector: 'app-categoria-portafolio-add',
  templateUrl: './categoria-portafolio-add.component.html',
  styleUrls: ['./categoria-portafolio-add.component.scss']
})
export class CategoriaPortafolioAddComponent implements OnInit {

  @Output() categoriaC: EventEmitter<any>  = new EventEmitter();// envia la data
  @Input() CATEGORIAS:any =null;

  name:any =null;
  status:any ='PENDING';
  category_id:any =null;

  imagenPrevisualizar :any = './assets/media/avatars/300-6.jpg';
  filePortada:any = null;

  isLoading:any;
  selected_option: any = 1;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categoryService: CategoriaPortafolioService
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss;
    this.isLoading = this.categoryService.isLoading$;
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

    this.categoryService.registerCategory(formData).subscribe((res:any)=>{
      console.log(res);
      this.categoriaC.emit(res.categoria);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'El Usuario se Registró correctamente',
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
