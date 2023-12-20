import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
    let URL = URL_SERVICIOS+'/product/config';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }

  listProducts(search:any, state: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;

    }

    let URL = URL_SERVICIOS+'/product'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  listProduct(id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    
    let URL = URL_SERVICIOS+'/product/'+id;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }




  registerProduct(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/product';

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  editarProduct(data:any, category_id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/product/'+category_id;

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deleteProduct(category_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/product/'+category_id;

    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }

  uploadVideo(data:any, product_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/product/upload_video/'+product_id;

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    ) 
  }

  updateStatus(data: any, product_id: any) {

    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/product/update/status/'+product_id;

    return this.http.put(URL, data,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }
}
