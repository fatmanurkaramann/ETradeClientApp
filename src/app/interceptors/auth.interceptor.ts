import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Oturum açma belirtecini (accessToken) localStorage'dan al
    const token = localStorage.getItem('accessToken');

    // Eğer belirteç varsa, isteğe Authorization başlığını ekleyin
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // İşlenmiş isteği devam ettirin
    return next.handle(request);
  }
}
