import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';
import { FileUploadComponent } from 'src/app/services/common/file-upload/file-upload.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf,MatButtonModule,FileUploadComponent],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  /**
   *
   */
  constructor(private productService:ProductService,private toastr:CustomToastrService) {

  }
  ngOnInit(): void {

  }
  Create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement)
  {
    const createProduct:CreateProduct = new CreateProduct()
    createProduct.name=name.value;
    createProduct.price=parseInt(price.value);
    createProduct.stock=parseFloat(stock.value);

    this.productService.createProduct(createProduct,()=>{
      this.toastr.message("Ürün Eklendi","",MessageType.Success);},
      errorMessage=>{
      this.toastr.message(errorMessage,"",MessageType.Error);
    });
  }
}
