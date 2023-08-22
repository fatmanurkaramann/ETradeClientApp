import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
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
    private productService: ProductService
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
    const td = this.element.nativeElement;
    await this.productService.delete(this.id)
    $(td.parentElement).fadeOut(2000,()=>{
      this.callback.emit()
    });
  }
}
