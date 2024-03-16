import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule,CommonModule,BasketsComponent],
})
export class HeaderComponent {
  constructor(public authService:AuthService) {
    authService.identityCheck();
  }

  signOut()
  {
    localStorage.removeItem("accessToken")
    this.authService.identityCheck();
  }
}
