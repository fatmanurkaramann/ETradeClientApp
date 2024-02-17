import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListProduct } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: ListProduct[]
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
  }
  currentPage: number
  totalProductCount: number
  totalPageCount: number
  pageSize: number = 12
  pageList: number[] = []
  async ngOnInit(): Promise<void> {
    this.getProducts()
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
}
