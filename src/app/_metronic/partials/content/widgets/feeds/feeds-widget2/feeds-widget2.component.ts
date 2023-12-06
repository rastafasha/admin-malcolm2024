import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DasboardService } from 'src/app/services/dasboard.service';

@Component({
  selector: 'app-feeds-widget2',
  templateUrl: './feeds-widget2.component.html',
})
export class FeedsWidget2Component implements OnInit {
  @Input()name;

  

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
