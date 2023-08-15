import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './app/admin/layout/layout.component';
import { DashboardComponent } from './app/admin/components/dashboard/dashboard.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(LayoutComponent, {
  providers: [
    importProvidersFrom(CommonModule, RouterModule.forRoot([
        {
            path: '',
            loadComponent: () => import('./app/ui/components/home/home.component').then((c) => c.HomeComponent)
        },
        { path: 'products', loadComponent: () => import('./app/ui/components/products/products.component').then((c) => c.ProductsComponent) },
        {
            path: 'admin',
            children: [
                { path: '', component: DashboardComponent },
                {
                    path: 'customers',
                    loadComponent: () => import('./app/admin/components/customer/customer.component').then((c) => c.CustomerComponent),
                },
                {
                    path: 'products',
                    loadComponent: () => import('./app/admin/components/products/products.component').then((c) => c.ProductsComponent),
                },
                {
                    path: 'orders',
                    loadComponent: () => import('./app/admin/components/orders/orders.component').then((c) => c.OrdersComponent),
                },
            ],
        },
    ])),
    provideAnimations()
],
});
