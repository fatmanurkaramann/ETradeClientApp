import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent {
  constructor(public authService:AuthService) {
    authService.identityCheck();
  }
}
