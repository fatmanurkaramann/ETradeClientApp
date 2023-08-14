import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './admin/layout/components/footer/footer.component';
import { SidebarComponent } from './admin/layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './admin/layout/components/header/header.component';
import { LayoutComponent } from './admin/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
