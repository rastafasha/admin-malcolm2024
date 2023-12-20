import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  @Input() user: User;
  // user:any=null;
  user_id:any=null;
  id:number;
  isLoading:any;
  parentMessage = "message from parent";
  option_selected:number = 1;
  
  constructor(
    public activatedRoute: ActivatedRoute,
    public dashboarService: DasboardService,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.dashboarService.isLoading$;
    this.activatedRoute.params.subscribe( ({id}) => this.showUser(id));
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
        this.user = res;
        console.log(this.user);
      }
    )
  }

  optionSelected(value:number){
    this.option_selected = value;
    console.log(value);
  }
}
