import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, map } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  
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

  registerCategory(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/categoria-product/store';

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }

  listCategories(search:any, state: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;

    }

    let URL = URL_SERVICIOS+'/categoria-product/'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }

  editarCategory(data:any, id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/categoria-product/update/'+id;

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deleteCategory(category_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/categoria-product/destroy/'+category_id;

    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }

}
