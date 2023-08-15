import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message:string,title:string,messageType:MessageType){
    this.toastr[messageType](message,title)
  }
}
export enum MessageType{
Success="success",
Info="info",
Warning="warning",
Error="error"
}
