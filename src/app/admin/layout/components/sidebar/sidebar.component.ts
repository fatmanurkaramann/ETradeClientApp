import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone:true,
  imports:[MatListModule,RouterModule]
})
export class SidebarComponent {

}
