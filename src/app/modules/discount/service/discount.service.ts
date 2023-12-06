import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listar(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    let URL = URL_SERVICIOS+'/descuento';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }

  listarConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    let URL = URL_SERVICIOS+'/coupon/config';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }
  
  listDiscounts(search:any, state: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;

    }

    let URL = URL_SERVICIOS+'/descuento'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  showDiscount(id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    
    let URL = URL_SERVICIOS+'/descuento/'+id;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }




  registerDiscount(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/descuento';

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  editarDiscount(data:any, descuento_id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/descuento/'+descuento_id;

    return this.http.put(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deleteDiscount(descuento_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/descuento/'+descuento_id;

    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }
}
