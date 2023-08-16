import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:CreateProduct,succesCallBack?:any,errorCallBack?:any)
  {
    this.httpClientService.post<CreateProduct>({controller:"products"},product).subscribe(result=>{
      succesCallBack();
      alert("Başarılı");
    },(error:HttpErrorResponse)=>{
     const err:Array<{key:String,value:Array<string>}>= error.error;
      let message ="";
      err.forEach((value,index)=>{
        value.value.forEach((_v,_i)=>{
          message+= `${_v}.`;
        })
      })
     errorCallBack(message);
    })
  }
}
