import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, provideRouter, withViewTransitions } from '@angular/router';
import { LayoutComponent } from './app/admin/layout/layout.component';
import { DashboardComponent } from './app/admin/components/dashboard/dashboard.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { authGuard } from './app/guards/common/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
const appRoutes: Routes = [{
  path: 'sign-up',
  loadComponent: () =>
    import('./app/ui/components/register/register.component').then(
      (c) => c.RegisterComponent
    ),
},
{
  path: 'sign-in',
  loadComponent: () =>
    import('./app/ui/components/login/login.component').then(
      (c) => c.LoginComponent
    ),
},
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
  path: 'baskets',
  loadComponent: () =>
    import('./app/ui/components/baskets/baskets.component').then(
      (c) => c.BasketsComponent
    ),
},
{
  path: 'product-detail/:id',
  loadComponent: () =>
    import('./app/ui/components/products/product-detail/product-detail.component').then(
      (c) => c.ProductDetailComponent
    ),
},
{
  path: 'products/:pageNo',
  loadComponent: () =>
    import('./app/ui/components/products/products.component').then(
      (c) => c.ProductsComponent
    ),
},
{
  path: 'admin',
  component: LayoutComponent,
  canActivate: [authGuard],
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
  ]
}];
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withViewTransitions()),
    {provide:"baseUrl",useValue:"https://localhost:7127/api",multi:true},   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(
      CommonModule,
      JwtModule.forRoot({
        config:{
          tokenGetter:()=>{
            return localStorage.getItem("accessToken")
          },
          allowedDomains:["localhost:7127/"]
        }
      }),
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
      HttpClientModule,
      MatDialogModule,
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(),
      RouterModule.forRoot([
        
      ])
    ),
    provideAnimations(),
  ],
});
