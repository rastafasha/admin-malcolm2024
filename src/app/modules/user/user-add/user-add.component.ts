import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @Output() userC: EventEmitter<any>  = new EventEmitter();// envia la data

  name:any =null;
  surname:any =null;
  password:any =null;
  confirmation_password:any =null;
  email:any =null;

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
      || !this.email
      || !this.password
      || !this.confirmation_password
      || !this.fileAvatar){
        this.toaster.open({
          text:'Necesitas llenar todos los Campos',
          caption: 'Validación',
          type:'danger'
        })
        return;
      }

    if(this.password != this.confirmation_password){
      this.toaster.open({
        text:'Las Contraseñas deben ser iguales',
        caption: 'Validación',
        type:'danger'
      })
      return;
      }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('role_id', '1');
    formData.append('type_user', '2');
    formData.append('imagen', this.fileAvatar);

    
    this.userService.register(formData).subscribe((res:any)=>{
      console.log(res);
      this.userC.emit(res.user);//envia la data creada del hijo al padre como nuevo
      this.toaster.open({
        text:'El Usuario se Registró correctamente',
        caption: 'Informe',
        type:'success'
      })
      this.modal.close();
      
    })


  }

}
