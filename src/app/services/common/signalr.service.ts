import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  private _connection: HubConnection
  get connection(): HubConnection {
    return this._connection
  }
  start(hubUrl: string) {
    if (!this._connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect()
        .build()

      hubConnection.start().then(() => {
        console.log("Reconnected")
      }).catch(err => setTimeout(() => {
        this.start(hubUrl)
      }, 2000))
      this._connection = hubConnection
    }
    this._connection.onreconnected(connectionId => {
      console.log("Reconnected");
      this._connection.onreconnecting(error => console.log("Reconnecting")
      )
    })
    this._connection.onclose(error => console.log("Close reconnection")
    )

  }
  invoke(procedureName: string, message: any, successCallback?: (value) => void, errorCallback?: (error) => void) {
    this.connection.invoke(procedureName, message).then(successCallback).catch(errorCallback)
  }
  on(procedureName: string, callback: (...message) => void) {
    this.connection.on(procedureName, callback)
  }
}
