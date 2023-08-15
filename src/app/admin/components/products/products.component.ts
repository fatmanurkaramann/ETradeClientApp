import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [HttpClientModule],
})
export class ProductsComponent implements OnInit {
  constructor(private httpClientService: HttpClientService) {}
  ngOnInit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Sunucu politikalarına göre değiştirin
      })
    };
    this.httpClientService
      .get<Product[]>({
        controller: "products",
      })
      .subscribe((data) => {

        console.log(data);

      });

    this.httpClientService
      .post({ controller: 'products' }, { name: 'Kalem', stock: 15, price: 10 })
      .subscribe();
  }
}
