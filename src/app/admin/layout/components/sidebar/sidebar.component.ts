import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
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
  ngOnInit(): void {

  }

}

