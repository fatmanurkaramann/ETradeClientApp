import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';
import { AuthService } from 'src/app/services/common/auth.service';
import { ComponentName, DynamicLoadComponentService } from 'src/app/services/common/dynamic-load-component.service';
import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, BasketsComponent,DynamicLoadComponentDirective],
})
export class HeaderComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective
  constructor(public authService: AuthService, private dynamicLoadComponent: DynamicLoadComponentService) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken")
    this.authService.identityCheck();
  }
  loadComponent() {
    this.dynamicLoadComponent.loadComponent(ComponentName.BasketComponent, 
      this.dynamicLoadComponentDirective.viewContainerRef)

  }
}
