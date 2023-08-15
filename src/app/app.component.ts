import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HeaderComponent } from './admin/layout/components/header/header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CustomToastrService, MessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[RouterModule,HeaderComponent,CommonModule // required animations module
]
})
export class AppComponent {
  title = 'ETradeClientApp';

  /**
   *
   */
  constructor(private toastr:CustomToastrService) {
   this.toastr.message("Merhaba","",MessageType.Success);

  }
}
