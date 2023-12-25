import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DasboardService } from 'src/app/services/dasboard.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-feeds-widget3',
  templateUrl: './feeds-widget3.component.html',
  styleUrls: ['./feeds-widget3.component.scss']
})
export class FeedsWidget3Component implements OnInit {

  @Input() childMessage:any; //recibe la data
  @Output() userV: EventEmitter<any>  = new EventEmitter();// envia la data
  COURSES:any;
  isLoading:any;
  imagenSerUrl = environment.apiUrlMedia;
constructor(
    public dashboarService: DasboardService,
    public modalService: NgbModal,
  ) { }
  ngOnInit(): void {
    this.isLoading = this.dashboarService.isLoading$;

    // this.n_transaccion = this.user.n_transaccion;
    console.log(this.childMessage);

    this.COURSES = this.childMessage.courses;

  }
}
