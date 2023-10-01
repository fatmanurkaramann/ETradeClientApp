import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { CustomToastrService, MessageType } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenReposnse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService,private toastr:CustomToastrService) {}

  async create(user: User): Promise<Create_User> {
    try {
      const obs: Observable<Create_User | User> = this.httpClientService.post<
        Create_User | User
      >({ controller: 'users' }, user);
      const response = (await firstValueFrom(obs)) as Create_User;
      console.log('API Response:', response);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  async login(userNameOrEmail:string, password:string,callbackFunction?:()=>void) :Promise<any> {
   const obs = this.httpClientService.post<any | TokenResponse>(
      { controller: 'users', action: 'login' },
      { userNameOrEmail, password }
    );
   const token = await firstValueFrom(obs) as TokenResponse
   if(token)
   {
    localStorage.setItem("accessToken",token.token.accessToken)
    this.toastr.message("Giriş başarılı","",MessageType.Success)
   }
   else{
    this.toastr.message("Giriş başarısız.Tekrar deneyiniz","",MessageType.Error)

   }
   callbackFunction();
  }

}
