import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
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
    private productService: ProductService,
    public dialog:MatDialog
  ) {
    const btn = _renderer.createElement('button');
    btn.setAttribute('class', 'btn btn-danger');
    btn.textContent = 'Delete';
    _renderer.appendChild(element.nativeElement, btn);
  }
  @Input() id:string
  @Output() callback:EventEmitter<any>=new EventEmitter()
  @HostListener('click')
  async onClick() {
    this.openDialog(async ()=>{
      const td = this.element.nativeElement;
      await this.productService.delete(this.id)
      $(td.parentElement).fadeOut(2000,()=>{
        this.callback.emit()
      });
    })
  }
  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==DeleteState.Yes){
       afterClosed()
      }
    });
  }
}
