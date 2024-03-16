import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, first, firstValueFrom } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item/list-basket-item';
import { AddBasketItem } from 'src/app/contracts/basket/add-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/list-basket-item/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient:HttpClientService) { }

  async getBasket():Promise<ListBasketItem[]>{
    const observable:Observable<ListBasketItem[]> = this.httpClient.get({
      controller: 'baskets'
    });
    return await firstValueFrom(observable);
  }
  add(product:AddBasketItem):Promise<void>{
    const observable:Observable<any> =this.httpClient.post({
      controller: 'baskets',
    }, product);
    return firstValueFrom(observable);
  }
  put(product:UpdateBasketItem):Promise<void>{
    const observable:Observable<any> =this.httpClient.put({
      controller: 'baskets',
    }, product);
    
    return firstValueFrom(observable);
  }
  async delete(basketItemId:string):Promise<void>{
    const observable:Observable<any> =this.httpClient.delete({
      controller: 'baskets',
      queryString:basketItemId
    },);
    return firstValueFrom(observable);
  }
}
