import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/common/models/user.service';
import { GlobalToastrConfig } from 'ngx-toastr';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,private toastr:CustomToastrService) {}
  ngOnInit(): void {
  }
  isAuth:boolean=false
  async login(userNameOrEmail: string, password: string) {
    await this.userService.login(userNameOrEmail, password,()=>{
      this.isAuth=true;
      this.toastr.message("Giriş başarılı","",MessageType.Success)
    });
  }
}
