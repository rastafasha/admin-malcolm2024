import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-tables-widget10',
  templateUrl: './tables-widget10.component.html',
})
export class TablesWidget10Component implements OnInit {
  users:any;
  recientes:any;
  isLoading: any = null;
  constructor(
    public dashboardService: DasboardService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.dashboardService.isLoading$;
    // this.getClientes();
    this.getClienteRecientes();
  }

  getClientes(){
    this.dashboardService.getClientes().subscribe((resp:any)=>{
      this.users = resp.data;
      // console.log(resp.data);
    })
  }
  getClienteRecientes(){
    this.dashboardService.getRecentClientes().subscribe((resp:any)=>{
      this.recientes = resp.data;
      // console.log(resp.data);
    })
  }
}
