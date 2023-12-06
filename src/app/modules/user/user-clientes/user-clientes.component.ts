import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-clientes',
  templateUrl: './user-clientes.component.html',
  styleUrls: ['./user-clientes.component.scss']
})
export class UserClientesComponent implements OnInit {

  USERS:any;
  isLoading: any = null;
  search:any= null;
state:any= null;

  constructor(
    public modalService: NgbModal,
    public userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.userService.isLoading$;
    this.listarUsuarios();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  openModalCreateUser(){
    // const modalRef = this.modalService.open(UserAddComponent,{centered: true, size:'md'});

    // //recibe el usuario editado por medio de ouput desde crear
    // modalRef.componentInstance.userC.subscribe((User:any)=>{
    //   this.USERS.unshift(User);
    // })

  }

  listarUsuarios(){
    this.userService.listClientes().subscribe(
      (res:any)=>{
        this.USERS = res.users.data;
        console.log(res);
      }
    )
  }


  editUser(user:any){
    // const modalRef = this.modalService.open(UserEditComponent,{centered: true, size:'md'})
    // modalRef.componentInstance.user = user;
    // //recibe el usuario editado por medio de ouput desde editar
    // modalRef.componentInstance.userE.subscribe((User:any)=>{
    //   let INDEX =  this.USERS.findIndex((item:any) => item.id == User.id)
    //   this.USERS[INDEX] = User;
    // })

  }
  eliminarUser(user:any){
    // const modalRef = this.modalService.open(UserDeletComponent,{centered: true, size:'md'})
    // modalRef.componentInstance.user = user;
    // //recibe el usuario editado por medio de ouput desde editar
    // modalRef.componentInstance.userD.subscribe((res:any)=>{
    //   let INDEX =  this.USERS.findIndex((item:any) => item.id == res.id)
    //   this.USERS.splice(INDEX, 1);
    // })

  }

}
