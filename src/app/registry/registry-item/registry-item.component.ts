import { Component, OnInit } from '@angular/core';
import {Registrar, RegistryService} from "../registry.service";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../chat/chat.service";

@Component({
  selector: 'app-registry-item',
  templateUrl: './registry-item.component.html',
  styleUrls: ['./registry-item.component.scss']
})
export class RegistryItemComponent implements OnInit {
  registrar:Registrar;
  constructor(private chatService:ChatService,private service:RegistryService,private route: ActivatedRoute) {
    this.registrar = RegistryService.emptyRegistrar();
  }

  ngOnInit(): void {
    this.route.url.subscribe(()=>{
      this.refreshRegistrar();
    });
    this.refreshRegistrar();
  }

  refreshRegistrar(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getById(id).subscribe(r=>{
        this.registrar = r;
      });
    }
  }

  sendMessage(){
   // this.chatService.sendMessage(this.registrar,"Hello World");
  }

}
