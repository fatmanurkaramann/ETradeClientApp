
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



bootstrapApplication(AppComponent,{
  providers:
  [
    importProvidersFrom(CommonModule,
      RouterModule.forRoot([
        {path:'',loadComponent:()=>import("./app/admin/layout/layout.component").then(c=>c.LayoutComponent)},
        {path:'products',loadComponent:()=>import("./app/admin/components/products/products.component").then(c=>c.ProductsComponent)},
        {path:'customer',loadComponent:()=>import("./app/admin/components/customer/customer.component").then(c=>c.CustomerComponent)},

      ])

      )
  ]
})
