import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, map } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';
import { CategoriaPortafolio } from '../categoria-portafolio.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPortafolioService {

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

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
      headers: {
        'token': this.token
      }
    }
  }

  registerCategory(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/categorias/store';

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

    let URL = URL_SERVICIOS+'/categorias'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }

  editarCategory(data:any, id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/categorias/update/'+id;

    return this.http.put(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deleteCategory(categoria:any){
    // this.isLoadingSubject.next(true);
    const url = `${URL_SERVICIOS}/categorias/destroy/${categoria}`;
    return this.http.delete(url, this.headers);
  }

  updateStatus(categoria:CategoriaPortafolio) {
    this.isLoadingSubject.next(true);
    const url = `${URL_SERVICIOS}/categorias/update/status/${categoria.id}`;
    return this.http.put(url, categoria, this.headers);
  }


  getCategoriesActivas() {
    const url = `${URL_SERVICIOS}/categorias/activos`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, categorias: CategoriaPortafolio}) => resp.categorias)
      )
  }

}
