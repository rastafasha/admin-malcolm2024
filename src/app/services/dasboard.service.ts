import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from '../modules/auth';
import { URL_SERVICIOS } from '../config/config';
import { Sale } from '../models/sale';

const baseUrl = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class DasboardService {

    isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;


  constructor(
    private http: HttpClient,
    public authservice: AuthService
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


 
  getClientes() {
      this.isLoadingSubject.next(true);
    const url = `${baseUrl}/users`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, users: User[]}) => resp.users),
        finalize(()=> this.isLoadingSubject.next(false))
        )
  }
 
  getSales() {
      this.isLoadingSubject.next(true);
    const url = `${baseUrl}/sale`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, sales: Sale[]}) => resp.sales),
        finalize(()=> this.isLoadingSubject.next(false))
        )
  }

  getUserById(id:any) {
    this.isLoadingSubject.next(true);
  const url = `${baseUrl}/users/showuser/${id}`;
  return this.http.get<any>(url)
    .pipe(
      map((resp:{ok: boolean, user: User[]}) => resp.user),
      finalize(()=> this.isLoadingSubject.next(false))
      )
}


//   getClientes(){
//       this.isLoadingSubject.next(true);
//     let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

//     let URL = URL_SERVICIOS+'/users';

//     return this.http.get(URL, {headers: headers}).pipe(
//       finalize(()=> this.isLoadingSubject.next(false))
//     )
//   }
//   getRecentClientes(){
//     this.isLoadingSubject.next(true);
//     let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

//     let URL = URL_SERVICIOS+'/users/recientes';

//     return this.http.get(URL, {headers: headers}).pipe(
//       finalize(()=> this.isLoadingSubject.next(false))
//     )
//   }

 
  getRecentClientes() {
    this.isLoadingSubject.next(true);
    const url = `${baseUrl}/users/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, recientes: User[]}) => resp.recientes),
        finalize(()=> this.isLoadingSubject.next(false))
      )
  }

}
