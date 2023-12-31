import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;
@Directive({
  selector: '[appDelete]',
  standalone: true,
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClient: HttpClientService,
    public dialog:MatDialog,
    private dialogService:DialogService
  ) {
    const btn = _renderer.createElement('button');
    btn.setAttribute('class', 'btn btn-danger');
    btn.textContent = 'Delete';
    _renderer.appendChild(element.nativeElement, btn);
  }
  @Input() id:string
  @Input() controller:string
  @Output() callback:EventEmitter<any>=new EventEmitter()
  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({component:DeleteDialogComponent,data:DeleteState.Yes,afterClosed:async ()=>{
      const td = this.element.nativeElement;
      // await this.productService.delete(this.id)
      //controlleri directivin kullanıldığı yerden almalıyız.
      this.httpClient.delete({controller:this.controller},this.id).subscribe(()=>{
        $(td.parentElement).fadeOut(2000,()=>{
          this.callback.emit()
        });
      })

    }})

  }
}
