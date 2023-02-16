import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Config} from "../services/config";
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {SaasyService} from "../auth/saasy-service";
import {Registrar} from "../registry/registry.service";

export interface ChatMessage {
  id:string | null;
  senderId:string | null;
  recipientId:string | null;
  senderName:string | null;
  recipientName:string | null;
  content:string | null;
  timestamp:string | null;
  status:string | null;
  isMine:boolean | false;
}
/*export interface ChatNotification {
  id:string | null;
  senderId:string | null;
  senderName:string | null;
}*/

export interface User extends Registrar{
  count:number | 0;
}

export interface ChatRoom {
  id:string | null;
  chatId:string | null;
  senderId:string | null;
  recipientId:string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  stompClient: any;
  messageSubscription:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  messageCountChange:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public http: HttpClient, public config: Config) {
    this.connect();
  }

  countNewMessages(senderId: string | null,recipientId: string | null):Observable<number> {
    return this.http.get<number>(this.config.api + "/rest/messages/" + senderId + '/' + recipientId + '/count');
  }

  countMyNewMessages(recipientId: string | null):Observable<number> {
    return this.http.get<number>(this.config.api + "/rest/messages/count/" + recipientId);
  }

  findChatMessages(senderId: string | null,recipientId: string | null):Observable<Array<ChatMessage>> {
    return this.http.get<Array<ChatMessage>>(this.config.api + "/rest/messages/" + senderId + '/' + recipientId);
  }

  findChatMessage(id: string):Observable<ChatMessage> {
    return this.http.get<ChatMessage>(this.config.api + "/rest/messages/" + id);
  }

  connect(){
    let ws = new SockJS(`${this.config.api }/ws`);
    const that = this;
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe("/user/" + SaasyService.getTenant().id + "/queue/messages",
        (msg:any) => {
          that.messageSubscription.next(JSON.parse(msg.body));
        }
      );
    }, this.onError);
  }

  onError(err:any){
    console.log("ERROR OCCURRED WHEN TRYING TO CONNECT");
    console.log(err);
  };

  listenForMessages() : Observable<any> {
    return this.messageSubscription.asObservable();
  }

  listenForMessageCountChange() : Observable<any> {
    return this.messageCountChange.asObservable();
  }
  sendMessage(registrar:Registrar,msg:string) : any {
    if (msg !== "") {
      const message = {
        isMine:true,
        senderId: SaasyService.getTenant().id,
        senderName: SaasyService.getTenant().name,
        recipientId: registrar.tenantId,
        recipientName: registrar.company,
        content: msg,
        timestamp: new Date(),
      };
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
      return message;
    }
  };
}
