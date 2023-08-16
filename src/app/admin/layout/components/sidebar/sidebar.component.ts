import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Router, RouterModule,NavigationEnd  } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone:true,
  imports:[MatListModule,RouterModule,MatButtonModule, MatMenuModule]
})
export class SidebarComponent implements OnInit {
  isSubMenuActive: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSubMenuActive = event.url.includes('/admin/products');
      }
    });
  }
  ngOnInit(): void {

  }

}

