import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BaseDialog } from '../base/base-dialog';
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule,  MatButtonModule,MatDialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
/**
 *
 */

export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent>{
  constructor( dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState,) {
    super(dialogRef); //BaseDialogun ctoru parametreli olduğu için
  }

}
export enum DeleteState
{
  Yes,
  No
}
