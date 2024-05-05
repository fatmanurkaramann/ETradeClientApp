import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddBasketItem } from 'src/app/contracts/basket/add-basket-item';
import { ListProduct } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: any[]
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,private basketService:BasketService,
    private _toastrService:CustomToastrService) {
  }
  currentPage: number
  totalProductCount: number
  totalPageCount: number
  pageSize: number = 12
  pageList: number[] = []
  files:any
  async ngOnInit(): Promise<void> {
    this.getProducts();
    this.productService.listImages().subscribe(
      (response:any) => {
        this.files =  this.mergeFilesWithImagePaths(response);
      },
    );
  }
  private mergeFilesWithImagePaths(files: any[]): any[] {
    return files.map((file) => {
      const fileNameWithoutExtension = file.fileName.split('.')[0];
      const encodedFileName = encodeURIComponent(file.fileName);
      const imagePath = `/resources/files/${encodedFileName}.jpg`;
      return {
        ...file,
        imagePath: imagePath,
      };
    });
  }
  getProducts() {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPage = parseInt(params["pageNo"] ?? 1)
      let response = await this.productService.listProduct(
        this.currentPage - 1, this.pageSize, () => {

        }, err => {

        }
      );
      this.products = response.products
      this.totalProductCount = response.totalCount
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize)
      this.pageList = []
      this.products.map(p=>{
        viewTransitionName: `view-transition-name:p-${p.id}`
      })
      if (this.currentPage - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i)
        }
      }
      else if (this.currentPage + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount-1; i <= this.totalPageCount; i++) {
          this.pageList.push(i)
        }
      else
        for (let i = this.currentPage-1; i <= this.currentPage+1; i++) {
          this.pageList.push(i)
        }
    })

  }
  async addToBasket(product:ListProduct)
  {
    let basketItem = new AddBasketItem();
    basketItem.productId = product.id;
    basketItem.quantity = 1
    await this.basketService.add(basketItem)
    this._toastrService.message("Ürün sepete eklendi.","",MessageType.Success)
  }
}
