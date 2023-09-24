import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<Create_User> {
    try {
      const obs: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({ controller: 'users' }, user);
      const response = await firstValueFrom(obs) as Create_User;
      console.log('API Response:', response);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error; // Rethrow the error to handle it in the component.
    }
  }

}
