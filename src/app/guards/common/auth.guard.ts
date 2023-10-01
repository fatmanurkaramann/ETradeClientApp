import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, MessageType } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: "root"
})
export class authGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,private router:Router,private toastr:CustomToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('accessToken');
    const decodeToken = this.jwtHelper.decodeToken(token);
    const expireDate = this.jwtHelper.getTokenExpirationDate(token);
    let expired:boolean;
    try {
      expired=this.jwtHelper.isTokenExpired(token)
    } catch (error) {
      expired=true;
    }
    if(!token || expired)
    {
      this.router.navigate(["sign-in"],{queryParams:{returnUrl:state.url}})
      this.toastr.message("Yetkisiz erişim","Oturum açın",MessageType.Error)
    }
    return true;
  }
}
