import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
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

export class DeleteDialogComponent {

  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState,) {
  }

  close()
{
  this.dialogRef.close();
}
}
export enum DeleteState
{
  Yes,
  No
}
