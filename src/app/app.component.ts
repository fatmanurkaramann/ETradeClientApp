import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[RouterModule]
})
export class AppComponent {
  title = 'ETradeClientApp';
}
