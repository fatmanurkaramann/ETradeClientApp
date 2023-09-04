import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './app/admin/layout/layout.component';
import { DashboardComponent } from './app/admin/components/dashboard/dashboard.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7127/api",multi:true},
    importProvidersFrom(
      CommonModule,
      HttpClientModule,
      MatDialogModule,
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(),
      RouterModule.forRoot([
        {
          path: '',
          loadComponent: () =>
            import('./app/ui/components/home/home.component').then(
              (c) => c.HomeComponent
            ),
        },
        {
          path: 'products',
          loadComponent: () =>
            import('./app/ui/components/products/products.component').then(
              (c) => c.ProductsComponent
            ),
        },
        {
          path: 'admin',
          component: LayoutComponent,
          children: [
            { path: '', component: DashboardComponent },
            {
              path: 'customers',
              loadComponent: () =>
                import(
                  './app/admin/components/customer/customer.component'
                ).then((c) => c.CustomerComponent),
            },
            {
              path: 'products',
              loadComponent: () =>
                import(
                  './app/admin/components/products/list/list.component'
                ).then((c) => c.ListComponent),
            },
            {
              path: 'products/create',
              loadComponent: () =>
                import(
                  './app/admin/components/products/create/create.component'
                ).then((c) => c.CreateComponent),
            },
            {
              path: 'orders',
              loadComponent: () =>
                import('./app/admin/components/orders/orders.component').then(
                  (c) => c.OrdersComponent
                ),
            },
          ],
        },
      ])
    ),
    provideAnimations(),
  ],
});
