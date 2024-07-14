import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/list-basket-item/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppinComplete, ShoppingCompleteDialogComponent } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
declare var $: any
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class BasketsComponent implements OnInit {
  basketItem: ListBasketItem[]
  displayedColumns: string[] = ['productName', 'productQuantity', 'productPrice', 'delete'];
  constructor(private _basketSerivce: BasketService, private spinner: NgxSpinnerService,
    private _orderService: OrderService, private toastr: ToastrService,
    private router: Router, private dialogService: DialogService
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.spinner.show()
    this.basketItem = await this._basketSerivce.getBasket()
    this.spinner.hide()
  }
  async changeQuantity(event: any) {
    this.spinner.show()
    const basketItemId = event.target.getAttribute("data-id");
    const quantity: number = event.target.value;
    let updateBasket: UpdateBasketItem = new UpdateBasketItem()
    updateBasket.basketItemId = basketItemId
    updateBasket.quantity = quantity
    await this._basketSerivce.put(updateBasket)
    this.spinner.hide()
  }
  deleteBasketItem(id: any) {
    this.dialogService.openDialog({
      component: BasketItemRemoveDialogComponent, data: BasketItemDeleteState.Yes, afterClosed: async () => {
        this.spinner.show()
        await this._basketSerivce.delete(id)
        var a = $(".column-" + id)
        var elements = $(".column-" + id);

        // Silinen satırın sınıfını içeren her bir elementi yavaşça kaybolması için döngü ile işle
        elements.each((index, element) => {
          $(element).parent().fadeOut(500, () => {
            $(element).parent().remove(); // Satırın kendisini sil
            this.spinner.hide();
          });
        });
      }
    })

  }
  async shoppingCompleted() {
    this.dialogService.openDialog({
      component: ShoppingCompleteDialogComponent, data: ShoppinComplete.Yes, afterClosed: async () => {
        this.spinner.show()
        const order: CreateOrder = new CreateOrder()
        order.address = "Bartın"
        order.description = "test"
        await this._orderService.create(order)
        this.spinner.hide()
        this.toastr.success("Siparişiniz alınmıştır!")
        this.router.navigate(["/"])
      }
    })

  }
}
