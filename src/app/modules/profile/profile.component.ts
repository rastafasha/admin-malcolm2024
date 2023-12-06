import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user:any=null;
  user_id:any=null;
  id:number;
  isLoading:any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public dashboarService: DasboardService,

  ) {}

  ngOnInit(): void {
    this.isLoading = this.dashboarService.isLoading$;
    // this.activatedRoute.params.subscribe( ({id}) => this.showUser(id));
    // this.activatedRoute.params.subscribe(
    //   (res:any)=>{
    //     this.user_id = res.id;
    //     this.showUser(this.user_id)
    //   }
    // )
  }

  showUser(id:number) {
    this.dashboarService.getUserById(id).subscribe(
      (res:any)=>{
        this.user = res.user;
        console.log(this.user);
      }
    )
  }
}
