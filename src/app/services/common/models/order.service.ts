import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClientService) { }

  async create(order:CreateOrder)
  {
   const observable:Observable<any>= this.httpClient.post({
      controller: 'orders'
    }, order)

    await firstValueFrom(observable)
  }
}
