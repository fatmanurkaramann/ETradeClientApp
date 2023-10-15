import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService,
  _isAuthenticated,
} from 'src/app/services/common/auth.service';
import {
  CustomToastrService,
  MessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: CustomToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!_isAuthenticated) {
      this.router.navigate(['sign-in'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastr.message('Yetkisiz erişim', 'Oturum açın', MessageType.Error);
    }
    return true;
  }
}
