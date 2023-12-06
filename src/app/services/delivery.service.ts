import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';

import { finalize, map } from 'rxjs/operators';
import { Delivery } from '../models/dlivery.model';

const base_url = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  //variables template metronic
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  

  public url;

  constructor(
    private http : HttpClient
  ) {
    this.url = environment.URL_SERVICIOS;
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  registro(data:any):Observable<any>{
    this.isLoadingSubject.next(true);
    const url = `${base_url}/delivery/store`;
    return this.http.post(url, data, this.headers);
    
  }

  listar():Observable<any>{
    const url = `${base_url}/delivery`;
    return this.http.get(url, )
    }

  getDelivery(id:string):Observable<any>{
    this.isLoadingSubject.next(true);
    const url = `${base_url}/delivery/show/${id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, delivery: Delivery}) => resp.delivery),
      finalize(()=> this.isLoadingSubject.next(false))
      );
  }

  eliminar(id:string):Observable<any>{
    this.isLoadingSubject.next(true);
    const url = `${base_url}/delivery/destroy/${id}`;
    return this.http.delete(url, this.headers);
  }
}
