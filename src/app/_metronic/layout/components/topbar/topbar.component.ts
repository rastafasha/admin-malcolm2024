import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { UserService } from 'src/app/modules/user/service/user.service';
import { AuthService } from 'src/app/modules/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  
  user$: Observable<any>;
  user: any = null;
  usuariotop: any = null;
  token: any = null;
  imagenSerUrl = environment.apiUrlMedia;

  constructor(
    private layout: LayoutService,
    public userService: UserService,
    private auth: AuthService,
    ) {}

  ngOnInit(): void {
    this.user = this.userService.authservice.user;
    this.token = this.userService.authservice.token;
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.headerLeft = this.layout.getProp('header.left') as string;
    // this.getCurrentUser();
    // console.log(this.user);
    this.getUserRemoto();
  }

  getUserRemoto(){
    this.userService.yo( this.token ).subscribe((resp:any)=>{
      // console.log(resp);
      this.usuariotop = resp;
    })
  }

  
}
