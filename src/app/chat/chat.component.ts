import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChatService, User} from "./chat.service";
import {RegistryService} from "../registry/registry.service";
import {SaasyService} from "../auth/saasy-service";
import {Router} from "@angular/router";
import {SaasyUser, SaasyUserService} from "../auth/saasy-user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  users:Array<User> = [];
  user:SaasyUser = SaasyUserService.emptyUser();
  constructor(private observer: BreakpointObserver,private userService:SaasyUserService,private chatService:ChatService,private registryService:RegistryService,private router: Router) { }

  ngOnInit(): void {

    this.userService.getTenantUser().subscribe(u=>{
      if(u){
        this.user = u;
      }
    })

    this.registryService.search().subscribe(r=>{
       r.content.filter(t=> t.tenantId !== SaasyService.getTenant().id).map(r=>{
          let user:any = r;
          this.chatService.countNewMessages(user.tenantId,SaasyService.getTenant().id).subscribe(t=>{
            user['count'] = t;
            this.users.push(user);
          })
      });
    })

    this.chatService.listenForMessageCountChange().subscribe(msg =>{

    })

  }

  updateMessageCount(){
    this.users
      .map(u => this.chatService.countNewMessages(u.tenantId,SaasyService.getTenant().id)
      .subscribe(t=> u.count = t)
    );
  }

  show(id: string | null) {
    let url = '/chat/' + id;
    this.router.navigate([url]).then();
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.observer.observe(['(max-width: 700px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close().then();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open().then();
        }
      });
    });
  }

}
