import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';

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

  async listProduct(page:number=0,size:number=5,succesCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,products: ListProduct[]}>{
   const promiseData:Promise<{totalCount:number,products: ListProduct[]}>=  this.httpClientService.get<{totalCount:number,products: ListProduct[]}>({
    controller:"products",
    queryString:`page=${page}&size=${size}`
  }).toPromise();

   promiseData.then(d=>succesCallBack())
   .catch((error:HttpErrorResponse)=>{errorCallBack(error.error)})

   return await promiseData;
  }
 async delete(id:string){
   const deleteObs:Observable<any> = this.httpClientService.delete<any>({controller:"products"},id)
    await firstValueFrom(deleteObs);
  }
}
