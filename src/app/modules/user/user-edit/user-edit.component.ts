import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() user:any; //recibe la data
  @Output() userE: EventEmitter<any>  = new EventEmitter();// envia la data

  name:any =null;
  surname:any =null;
  password:any =null;
  email:any =null;
  state:any =null;
  confirmation_password:any =null;
  profesion:any=null;
description:any=null;
isInstructor:any=null;

  imagenPrevisualizar :any = './assets/media/avatars/300-6.jpg';
  fileAvatar:any = null;

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.userService.isLoading$;

    this.name = this.user.name;
    this.surname = this.user.surname;
    this.email = this.user.email;
    this.state = this.user.state;
    this.profesion = this.user.profesion;
    this.description = this.user.description;
    this.isInstructor = this.user.isInstructor;
    this.imagenPrevisualizar = this.user.avatar;
    this.isInstructor = this.user.isInstructor;
    this.profesion = this.user.profesion;
    this.description = this.user.description;
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


    this.fileAvatar = $event.target.files[0];
    //previsualizacion de la imagen seleccionada
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.imagenPrevisualizar = reader.result;

  }

  store(){
    if(!this.name
      || !this.surname
      || !this.email){
        this.toaster.open({
          text:'Necesitas llenar todos los Campos',
          caption: 'Validación',
          type:'danger'
        })
        return;
      }

    if(this.password){
      if(this.password != this.confirmation_password){
        this.toaster.open({
          text:'Las Contraseñas deben ser iguales',
          caption: 'Validación',
          type:'danger'
        })
        return;
        }
      }

    let formData = new FormData();

    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('state', this.state);
    
    if(this.password){
      formData.append('password', this.password);
      
    }
    if(this.fileAvatar){
      formData.append('imagen', this.fileAvatar);
      
    }
    if(this.isInstructor){
      formData.append('isInstructor', this.isInstructor ? "1" : "0");
      formData.append('profesion', this.profesion);
      formData.append('description', this.description);

    }

    this.userService.editar(formData, this.user.id).subscribe((res:any)=>{
      console.log(res);
      this.userE.emit(res.user);//envia la data editada del hijo al padre como editado
      this.toaster.open({
        text:'El Usuario se Actualizó correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
      
    })


  }

  instructor(){
    this.isInstructor = !this.isInstructor;
  }
}
