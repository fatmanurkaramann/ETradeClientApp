import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './admin/layout/components/header/header.component';
import { CommonModule } from '@angular/common';
import { CustomToastrService, MessageType } from './services/ui/custom-toastr.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[RouterModule,HeaderComponent,CommonModule,NgxSpinnerModule // required animations module
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
