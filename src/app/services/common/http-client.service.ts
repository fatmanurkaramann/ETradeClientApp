import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${
      requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
    }/${requestParameter.controller}
    ${requestParameter.action ? `/${requestParameter.action}` : ''}`;
  }
  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndpoint) {
      url = requestParameter.fullEndpoint;
    } else {
      url = `${this.url(requestParameter)}${id ? `/${id}` : ''}
      ${requestParameter.queryString?`?${requestParameter.queryString}`:""}`;
    }

    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }
  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndpoint) {
      url = requestParameter.fullEndpoint;
    } else {
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:''}`;
    }
    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }
  put() {}
}
export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  queryString?:string;
  baseUrl?: string;
  fullEndpoint?:string
}
