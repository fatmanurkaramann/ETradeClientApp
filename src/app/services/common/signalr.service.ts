import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  private _connection: HubConnection
  start(hubUrl: string) {
    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect()
      .build()
    hubConnection.start().then(() => {
      console.log("Reconnected")
    }).catch(err => setTimeout(() => {
      this.start(hubUrl)
    }, 2000))
    hubConnection.onreconnected(connectionId => {
      console.log("Reconnected");
      hubConnection.onreconnecting(error => console.log("Reconnecting")
      )
    })
    hubConnection.onclose(error => console.log("Close reconnection")
    )
    return hubConnection;
  }
  invoke(hubUrl: string, procedureName: string, message: any, successCallback?: (value) => void, errorCallback?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message).then(successCallback).catch(errorCallback)
  }
  on(hubUrl: string, procedureName: string, callback: (...message) => void) {
    this.start(hubUrl).on(procedureName, callback)
  }
}
