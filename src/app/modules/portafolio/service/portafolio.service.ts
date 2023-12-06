import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';
import { Portafolio } from '../portafolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  //variables template metronic
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listarCategorias(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    let URL = URL_SERVICIOS+'/categorias';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }

  listPortafolios(search:any, state: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;

    }

    let URL = URL_SERVICIOS+'/portafolio'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  listPortafolio(id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    
    let URL = URL_SERVICIOS+'/portafolio/show/'+id;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }




  registerPortafolio(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/portafolio/store';

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  editarPortafolio(data:any, portafolio_id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/portafolio/update/'+portafolio_id;

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deletePortafolio(portafolio_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/portafolio/destroy/'+portafolio_id;

    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  updateStatus(portafolio:Portafolio) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    const url = `${URL_SERVICIOS}/portafolio/update/status/${portafolio.id}`;
    return this.http.put(url, portafolio, {headers: headers});
  }

  

}
