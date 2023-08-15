import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
declare var $:any
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone:true,
  imports:[HeaderComponent,SidebarComponent,FooterComponent,RouterModule,MatSidenavModule],
})
export class LayoutComponent implements OnInit{
  ngOnInit(): void {

  }

}

