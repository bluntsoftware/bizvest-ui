import { Component, OnInit } from '@angular/core';
import {Layout} from "./layout.types";
import {ChatService} from "../chat/chat.service";
import {SaasyService} from "../auth/saasy-service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layout:Layout = 'default';

  info:any = {};
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForMessages().subscribe(msg=>{
      this.getMessageCount();
    })
    this.getMessageCount();
  }

  getMessageCount(){
    this.chatService.countMyNewMessages(SaasyService.getTenant().id).subscribe(c=>{
      this.info['messageCount'] = c;
    })
  }
}
