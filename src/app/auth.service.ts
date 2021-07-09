import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  jwtDecode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl:string ='https://routeegypt.herokuapp.com/'
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('TOKEN')!=null)
    {
      this.savecurrentuser()
    }
   }
currentUser=new BehaviorSubject(null);

  signUp(formdata:any):Observable <any>
  {
return this._HttpClient.post(this.baseUrl+`signup`,formdata)
  }


  signIn(formdata:any):Observable <any>
  {
return this._HttpClient.post(this.baseUrl+`signin`,formdata)
  }

  signOut()
  {
this.currentUser.next(null);
localStorage.removeItem('TOKEN');
this._Router.navigate(['/login'])

  }
 savecurrentuser()
{
  let token:any = localStorage.getItem('TOKEN')
  this.currentUser.next(jwtDecode(token))
}

}
