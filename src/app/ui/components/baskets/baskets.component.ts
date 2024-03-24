import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/list-basket-item/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import {MatIconModule} from '@angular/material/icon';
declare var $:any
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule,MatButtonModule,MatIconModule],
})

export class BasketsComponent implements OnInit {
  basketItem: ListBasketItem[]
  displayedColumns: string[] = ['productName', 'productQuantity', 'productPrice','delete'];
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
  async deleteBasketItem(id:any)
  {
    this.spinner.show()
    await this._basketSerivce.delete(id)
    var a = $(".column-"+id)
    var elements = $(".column-"+id);
  
    // Silinen satırın sınıfını içeren her bir elementi yavaşça kaybolması için döngü ile işle
    elements.each((index, element) => {
      $(element).parent().fadeOut(500, () => {
        $(element).parent().remove(); // Satırın kendisini sil
        this.spinner.hide();
      });
    });
  }
}
