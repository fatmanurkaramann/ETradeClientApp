import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListProduct } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  CustomToastrService,
  MessageType,
} from 'src/app/services/ui/custom-toastr.service';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: CustomToastrService
  ) {}
  displayedColumns: string[] = [
    'name',
    'price',
    'stock',
    'createdDate',
    'updatedDate',
  ];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async ngOnInit() {
    this.getProducts();
  }
  async getProducts() {
    let response: {totalCount:number,products: ListProduct[]} = await this.productService.listProduct(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
        this.toastr.message('Ürünler listelendi', '', MessageType.Success);
      },
      (error) => {
        this.toastr.message('Ürünler listelenemedi', '', MessageType.Error);
      }
    );
    let allProducts = response.products;
    let total = response.totalCount;
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts);
    this.paginator.length = total;

  }
  async pageChanged() {
    await this.getProducts();

  }
}
