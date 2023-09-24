import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { Create_User } from 'src/app/contracts/users/create_user';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService:CustomToastrService
  ) {}
  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: ['', [Validators.required, Validators.maxLength(50)]],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        PasswordConfirm : ['', [Validators.required]],
      },
      {
        validators: [(group: AbstractControl): ValidationErrors | null => {

          let password = group.get('password').value;
          let passwordAgain = group.get('PasswordConfirm').value;
          return password === passwordAgain ? null : { notSame: true };
        }]
      }
    );
  }

  get component() {
    return this.frm.controls;
  }
  submitted: boolean = false;

  async onSubmit(frm: User) {
    this.submitted = true;
    if (this.frm.invalid || this.frm.get('password').value !== this.frm.get('PasswordConfirm').value) {
      this.toastrService.message("HATA","",MessageType.Info)
      return;
    }
   const result:Create_User = await this.userService.create(frm);
   if(result.succeded)
   {
    this.toastrService.message("Kullanıcı kaydı başarılı","",MessageType.Success)

   }

  }
}
