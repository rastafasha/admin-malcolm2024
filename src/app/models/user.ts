import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;
export class User {

  constructor(
    public id: number,
    public name: string,
public email: string,
public password: string,
public surname: string,
public avatar: string,
public profesion: string,
public description: string,
public phone: string,
public role_id: number,
public isInstructor: string,
public state: boolean,
public type_user: string,
  ){}

  get imagenUrl(){

    if(!this.avatar){
      return `${base_url}/users/no-image.jpg`;
    } else if(this.avatar.includes('https')){
      return this.avatar;
    } else if(this.avatar){
      return `${base_url}/users/${this.avatar}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
  


}
