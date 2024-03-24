import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/list-basket-item/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule],
})

export class BasketsComponent implements OnInit {
  basketItem: ListBasketItem[]
  displayedColumns: string[] = ['productName', 'productQuantity', 'productPrice'];
  constructor(private _basketSerivce: BasketService, private spinner: NgxSpinnerService) {
  }
  async ngOnInit(): Promise<void> {
    this.spinner.show()
    this.basketItem = await this._basketSerivce.getBasket()
    console.log(this.basketItem);
    this.spinner.hide()
  }
  async changeQuantity(event: any) {
    this.spinner.show()
    const basketItemId = event.target.getAttribute("data-id");
    console.log(basketItemId);
    const quantity: number = event.target.value;
    let updateBasket: UpdateBasketItem = new UpdateBasketItem()
    updateBasket.basketItemId = basketItemId
    updateBasket.quantity = quantity
    await this._basketSerivce.put(updateBasket)
    this.spinner.hide()
  }
}
