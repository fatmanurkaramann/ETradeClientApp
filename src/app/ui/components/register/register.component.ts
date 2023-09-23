import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ['',[Validators.required,Validators.maxLength(5)]],
      userName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      passwordAgain: ['',[Validators.required]],
    },{Validators:(group:AbstractControl): ValidationErrors | null =>{
      let password = group.get("password").value;
      let passwordAgain = group.get("passwordAgain").value;
      return password===passwordAgain ? null : {notSame:true}
    }});
  }

  get component()
  {
    return this.frm.controls;
  }

  submitted:boolean=false
  onSubmit(frm:User)
  {
    console.log(this.frm.hasError('notSame'))
    this.submitted=true
    if(this.frm.invalid)
    {
      return;
    }
  }
}
