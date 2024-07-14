import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shopping-complete-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatButtonModule,],
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrl: './shopping-complete-dialog.component.css'
})
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent>{

constructor(dialog: MatDialogRef<ShoppingCompleteDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ShoppinComplete) {
  super(dialog);
  
}
}
export enum ShoppinComplete
{
  Yes,No
}