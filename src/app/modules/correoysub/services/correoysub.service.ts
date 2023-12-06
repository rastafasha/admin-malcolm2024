import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class CorreoysubService {

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

 listCursos(search:any, state: any){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

   let LINK = "?T=";
   if(search){
     LINK += "&search="+search;
   }
   if(state){
     LINK += "&state="+state;

   }

   let URL = URL_SERVICIOS+'/course'+LINK;

   return this.http.get(URL, {headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   )
 }
 listCorreos(){
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
  
  let URL = URL_SERVICIOS+'/contact/';

  return this.http.get(URL, {headers: headers}).pipe(
    finalize(()=> this.isLoadingSubject.next(false))
  )
}

 listCorreo(id:any){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
   
   let URL = URL_SERVICIOS+'/contact/'+id;

   return this.http.get(URL, {headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   )
 }


 listSubcripciones(){
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});
  
  let URL = URL_SERVICIOS+'/subcripcion/';

  return this.http.get(URL, {headers: headers}).pipe(
    finalize(()=> this.isLoadingSubject.next(false))
  )
}




 registerCurso(data:any){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

   let URL = URL_SERVICIOS+'/course';

   return this.http.post(URL,data, {headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   )
 }


 editarCurso(data:any, category_id:number){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

   let URL = URL_SERVICIOS+'/course/'+category_id;

   return this.http.post(URL,data, {headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   )
 }


 deleteCurso(category_id:string){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

   let URL = URL_SERVICIOS+'/course/'+category_id;

   return this.http.delete(URL,{headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   )
 }

 uploadVideo(data:any, course_id:string){
   this.isLoadingSubject.next(true);
   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

   let URL = URL_SERVICIOS+'/course/upload_video/'+course_id;

   return this.http.post(URL,data, {headers: headers}).pipe(
     finalize(()=> this.isLoadingSubject.next(false))
   ) 
 }


}
