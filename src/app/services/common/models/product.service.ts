import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService,private spinner:NgxSpinnerService,private _http:HttpClient) {}

  createProduct(
    product: any,
    succesCallBack?: any,
    errorCallBack?: any
  ) {
    this.spinner.show();
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.httpClientService
      .post<CreateProduct>({ controller: 'products',headers:headers }, product)
      .subscribe(
        (result) => {
          succesCallBack();
          this.spinner.hide();
          alert('Başarılı');
        },
        (error: HttpErrorResponse) => {
          const err: Array<{ key: String; value: Array<string> }> = error.error;
          let message = '';
          err.forEach((value, index) => {
            value.value.forEach((_v, _i) => {
              message += `${_v}.`;
            });
          });
          errorCallBack(message);
        }
      );
  }
  detailProduct(
    productId: any,
  ) {
    this.spinner.show();
    const url = `https://localhost:7127/api/Products/detail?Id=${productId}`;
    return this._http
      .get<any>(url)
      
  }
  listImages() {
    return this.httpClientService
      .get<any>({ controller: 'products/images' });
  }
  async listProduct(
    page: number = 0,
    size: number = 5,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: any[] }> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.spinner.show();
    const promiseData: Promise<{
      totalCount: number;
      products: any[];
    }> = this.httpClientService
      .get<{ totalCount: number; products: any[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
        headers:headers
      })
      .toPromise();
      this.spinner.hide();
    promiseData
      .then((d) => succesCallBack())
      .catch((error: HttpErrorResponse) => {
        errorCallBack(error.error);
      });

    return await promiseData;
  }
  async delete(id: string) {
    const deleteObs: Observable<any> = this.httpClientService.delete<any>(
      { controller: 'products' },
      id
    );
    await firstValueFrom(deleteObs);
  }
}
