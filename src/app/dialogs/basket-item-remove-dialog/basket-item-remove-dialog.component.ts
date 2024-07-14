import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basket-item-remove-dialog',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrl: './basket-item-remove-dialog.component.css'
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> {

  constructor(dialog: MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState) {
    super(dialog);
  }
}
export enum BasketItemDeleteState {
  Yes,
  No
}