import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
errors:string='';
  constructor(private _AuthService:AuthService, private _Router:Router) { }
signin= new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)])
  })
login()
{
if(this.signin.valid)
{
  this._AuthService.signIn(this.signin.value).subscribe((res)=>{

if(res.message=='success')
{
  localStorage.setItem('TOKEN',res.token)
  this._AuthService.savecurrentuser()
  this._Router.navigate(['/profile'])
  
}
else
{
  this.errors=res.message
}
  })
}
  
}

  ngOnInit(): void {
    $('#login').particleground({
      dotColor: '#fff',
      lineColor: '#fff'
  });
  }

}
