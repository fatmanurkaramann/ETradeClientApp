import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(parameters:Partial<DialogParameters>):void
  {

    const dialogRef = this.dialog.open(parameters.component,{
      data:parameters.data
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res==parameters.data)
      {
       parameters.afterClosed();
      }
    })
  }
}
export class DialogParameters
{
  component:ComponentType<any>
  data:any
  afterClosed:()=>void
}
