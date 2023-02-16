import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatMessage, ChatService} from "../chat.service";
import {Registrar, RegistryService} from "../../registry/registry.service";
import {SaasyService} from "../../auth/saasy-service";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit , AfterViewInit{
  @ViewChildren('chatItem') itemElements: QueryList<any> | undefined;
  registrar:Registrar;
  message:string = ''
  messages:Array<ChatMessage> = [];

  constructor(private chatService:ChatService,private registryService:RegistryService,private route: ActivatedRoute,private router: Router) {
    this.registrar = RegistryService.emptyRegistrar();
  }

  ngAfterViewInit(): void {
    this.itemElements?.changes.subscribe(_ => {
        this.itemElements?.get(this.itemElements?.length-1)?.nativeElement.scrollIntoView({});
    });
  }

  ngOnInit(): void {
    this.refreshRegistrar();
    this.chatService.listenForMessages()
      .subscribe((msg)=>{
        if(msg){
          if (this.registrar && this.registrar.tenantId === msg.senderId) {
            this.chatService.findChatMessage(msg.id).subscribe((message) => {
              this.messages.push(message);
            });
          }
        }
      });
    this.route.url.subscribe(()=>{
      this.refreshRegistrar();
    });
  }

  refreshRegistrar(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.registryService.getById(id).subscribe(r=>{
        this.registrar = r;
        this.chatService.findChatMessages(r.tenantId,SaasyService.getTenant().id).subscribe(t=>{
          //this.chatService.messageCountChange.next({});
          this.messages = t.map(t=> {
            t.isMine = t.senderId === SaasyService.getTenant().id;
            return t;
          });
        });
      });
    }
  }

  sendMessage(){
    this.messages.push(this.chatService.sendMessage(this.registrar,this.message));
    this.message = '';
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
