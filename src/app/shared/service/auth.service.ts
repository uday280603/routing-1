import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Ilogin, ISignIn } from '../model/Iauth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_BASE_URL = environment.authBaseUrl;


  constructor(private _http : HttpClient , private _router : Router) { }

  logout() : Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return of({
      msg : 'Logout Successfully...!'
    })
    
   
    
  }

  logIn(userDeatils : Ilogin) : Observable<any>{

    let LOGIN_URL = `${this.API_BASE_URL}/api/auth/login`;
    return this._http.post(LOGIN_URL,userDeatils)

  }
  signUp(userDetails : ISignIn){
    let signInUrl = `${this.API_BASE_URL}/api/auth/register`;
    return this._http.post(signInUrl,userDetails);

  }

  saveToken(token : string) {
    return localStorage.setItem('token',token);
  }
  getToken(): string | null{
    return localStorage.getItem('token');
  }

  saveUser(userRole : string){
    return localStorage.setItem('userRole',userRole);
  }
  getUserRole() : string | null{
    return  localStorage.getItem('userRole');
  }


}
