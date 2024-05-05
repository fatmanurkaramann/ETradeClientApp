import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
constructor(private route: ActivatedRoute, private _productService: ProductService,private _spinner:NgxSpinnerService) {
 
}
productId: any;
productDetails: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails();
    });
  }
  getProductDetails() {
    this._productService.detailProduct(this.productId).subscribe((response) => { 
      this.productDetails = response;
      this._spinner.hide();
    });
  }
}
