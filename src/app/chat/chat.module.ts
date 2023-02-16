import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {MaterialModule} from "../material-module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {RouterModule} from "@angular/router";
import {chatRoutes} from "./chat.routing";

import {SaasyInterceptor} from "../auth/saasy-interceptor";
import { ChatRoomComponent } from './chat-room/chat-room.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: SaasyInterceptor,
      multi   : true
    }
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:9096/api/v1/', 'http://localhost:9094/', 'https://saasy-service.bluntsoftware.com/api/v1/'],
                sendAccessToken: true
            }
        }),
        RouterModule.forChild(chatRoutes),
        FormsModule,
    ]
})
export class ChatModule { }
