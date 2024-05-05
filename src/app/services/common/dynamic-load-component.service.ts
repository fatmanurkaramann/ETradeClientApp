import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {
  //ViewContainerRef :Dinamik olarak yüklenecek componenti içerisinde barındıran containerdır. her dinamik yükleme sürecinde önceki
  //viewları clear etmek gerekir.
  //componentFactory:Componentlerin instancelarını oluşturmak için kullanılan nesnedir.
  //componentFactoryResolver:Belirli component için component factoryi reseoolve eden sınıftır.
  constructor() { }
  async loadComponent(component: ComponentName, viewContainerRef: ViewContainerRef) {
    let _component: any = null
    switch (component) {
      case ComponentName.BasketComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent
        break;
      default:
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component)
  }
}
export enum ComponentName {
  BasketComponent
}