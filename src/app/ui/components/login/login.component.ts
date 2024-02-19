import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/common/models/user.service';
import { GlobalToastrConfig } from 'ngx-toastr';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,private toastr:CustomToastrService,private authService:AuthService,
    private spinner:NgxSpinnerService,
    private router: Router) {}
  ngOnInit(): void {
  }
  isAuth:boolean=false
  async login(userNameOrEmail: string, password: string) {
    this.spinner.show();
    await this.userService.login(userNameOrEmail, password,()=>{
      this.spinner.hide();
      this.authService.identityCheck();
      this.isAuth=true;
      this.router.navigate(['/admin']); 
      this.toastr.message("Giriş başarılı","",MessageType.Success)
    });
  }

}
