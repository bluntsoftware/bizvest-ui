import { Route } from '@angular/router';
import {ChatComponent} from "./chat.component";
import {ChatRoomComponent} from "./chat-room/chat-room.component";

export const chatRoutes: Route[] = [
  {
    path     : '',
    component: ChatComponent,
    children:[
      { path: ':id', component: ChatRoomComponent}
    ]
  }
];
