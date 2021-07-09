import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
isClicked:boolean = false;
responseMsg:string='';
isSuccess:boolean=false;
email:boolean=false;
emailMsg:string='';
  constructor(private _AuthService :AuthService) { }
signup = new FormGroup({ first_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
email:new FormControl(null,[Validators.required,Validators.email]),
age :new FormControl(null,[Validators.required,Validators.min(10),Validators.max(60)]),
password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)])}
)

register()
{
  this.isClicked = true;

this._AuthService.signUp(this.signup.value).subscribe((response)=>{
 
  if(response.message=="success"
)
 {

this.signup.reset()
this.isClicked=false;
this.responseMsg= response.message;
this.isSuccess=true;
this.email=false;


 }
 else
 {
   this.emailMsg=response.errors.email.message;
   this.email=true;
 }
 
})
}
  ngOnInit(): void {
    $('#register').particleground({
      dotColor: '#fff',
      lineColor: '#fff'
  });
  }

}
