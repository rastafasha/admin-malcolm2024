import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {

  langs: string[] = [];

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('en');
    this.translate.addLangs(["es", "en"]);
    this.langs = this.translate.getLangs();
    translate.get(this.langs).subscribe(res =>{
      console.log(res);
    })
    // console.log(this.translate);
  }

  cambiarLang(lang:string){
    this.translate.use(lang);

  }
}
