import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-feeds-widget2',
  templateUrl: './feeds-widget2.component.html',
})
export class FeedsWidget2Component implements OnInit {
 
  @Input() childMessage:any; //recibe la data
  @Output() userV: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;
  mapa:any
  direccionSelected:any =null;

  constructor(
    public dashboarService: DasboardService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isLoading = this.dashboarService.isLoading$;
    // console.log(this.childMessage);
  }

  

  urlMapa(url) {
    var mapa, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    mapa   = (results === null) ? url : results[1];

    // return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=@' + mapa+'6z?hl=es&entry=ttu');

    // <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6300515.913136637!2d-105.782067!3d39.550051!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sve!4v1703440817906!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=@' + mapa+'6z?hl=es&entry=ttu');
}

selectedDireccion(dir:any){
  this.direccionSelected = dir
}
}
