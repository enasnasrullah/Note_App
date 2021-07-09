import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
declare var $ :any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
token:any;
decoded:any;
allNotes:any []=[];

NoteID:any;
  constructor(private _Router:Router, private _NotesService : NotesService) {
this.token = localStorage.getItem('TOKEN')
this.decoded = jwt_decode( this.token )
this.getAllNotes()



   }

   getAllNotes()
   {
     let data = {
       token :this.token,
       userID:this.decoded._id
     }
     this._NotesService.getAllNotes(data).subscribe((res)=>{
 
       if (res.message=='success')
       {
         this.allNotes=res.Notes;
        
       
       }
       else
   {
     this.allNotes=[]
   }
       
     })
   }

   addNote= new FormGroup({
    title: new FormControl('',Validators.required),
    desc: new FormControl('',Validators.required)
   })
   
   addNotes()
   {
     let data ={
       title:this.addNote.value.title,
       desc:this.addNote.value.desc,
       token:this.token,
       citizenID:this.decoded._id

     }
     this._NotesService.addNotee(data).subscribe((res)=>{
       if(res.message=='success')
       {
         $('#addNote').modal('hide')
         this.getAllNotes()
         this.addNote.reset()
       }

     })
  
   }
  
getID(id:any)
{
this.NoteID=id;
}
deleteNote()
{

  let data ={
    NoteID:this.NoteID,
    token:this.token
  }
  this._NotesService.deleteNote(data).subscribe((res)=>{
    if (res.message=='deleted')
    {
      $('#deleteNote').modal('hide')
      this.getAllNotes()
    }
  })
}

setval()
{
  for(let i=0; i < this.allNotes.length;i++)
  {
    if(this.allNotes[i]._id==this.NoteID)
    {
      this.addNote.controls.title.setValue(this.allNotes[i].title)
      this.addNote.controls.desc.setValue(this.allNotes[i].desc)

    }
  }
}
edit()
{
let data ={
title: this.addNote.value.title,
desc: this.addNote.value.desc,
NoteID:this.NoteID,
token : this.token
}
  this._NotesService.update(data).subscribe((res)=>{

if (res.message=='updated')
{
  $('#editNote').modal('hide')
  this.getAllNotes()
  
}
  })
}
  ngOnInit(): void {
  }

}
