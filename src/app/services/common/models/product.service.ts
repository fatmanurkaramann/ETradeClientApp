import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:CreateProduct)
  {
    this.httpClientService.post<CreateProduct>({controller:"products"},product).subscribe(result=>{
      alert("Başarılı");
    })
  }
}
