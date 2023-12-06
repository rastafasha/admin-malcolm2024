import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from '../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeletComponent } from '../user-delet/user-delet.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

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
    const modalRef = this.modalService.open(UserAddComponent,{centered: true, size:'md'});

    //recibe el usuario editado por medio de ouput desde crear
    modalRef.componentInstance.userC.subscribe((User:any)=>{
      this.USERS.unshift(User);
    })

  }

  listarUsuarios(){
    this.userService.list(this.search, this.state).subscribe(
      (res:any)=>{
        this.USERS = res.users.data;
      }
    )
  }


  editUser(user:any){
    const modalRef = this.modalService.open(UserEditComponent,{centered: true, size:'md'})
    modalRef.componentInstance.user = user;
    //recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.userE.subscribe((User:any)=>{
      let INDEX =  this.USERS.findIndex((item:any) => item.id == User.id)
      this.USERS[INDEX] = User;
    })

  }
  eliminarUser(user:any){
    const modalRef = this.modalService.open(UserDeletComponent,{centered: true, size:'md'})
    modalRef.componentInstance.user = user;
    //recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.userD.subscribe((res:any)=>{
      let INDEX =  this.USERS.findIndex((item:any) => item.id == res.id)
      this.USERS.splice(INDEX, 1);
    })

  }

}
