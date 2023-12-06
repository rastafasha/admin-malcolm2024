import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';
import { Blog } from '../blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  
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
    let URL = URL_SERVICIOS+'/course/config';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }

  getCategorias(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    let URL = URL_SERVICIOS+'/categorias';
    
    this.isLoadingSubject.next(true);
    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )

  }

  listBlogs(search:any, state: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;

    }

    let URL = URL_SERVICIOS+'/blogs'+LINK;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  listBlog(id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
    
    let URL = URL_SERVICIOS+'/blog/show/'+id;

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }




  registerBlog(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/blog/store';

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  editarBlog(data:any, blog_id:number){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/blog/update/'+blog_id;

    return this.http.post(URL,data, {headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  deleteBlog(blog_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = URL_SERVICIOS+'/blog/destroy/'+blog_id;

    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    )
  }


  updateStatus(blog:Blog) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    const url = `${URL_SERVICIOS}/blog/update/status/${blog.id}`;
    return this.http.put(url, blog, {headers: headers});
  }
}
