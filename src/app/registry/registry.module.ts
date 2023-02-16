import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import {RouterModule} from "@angular/router";
import {registryRoutes} from "./registry.routing";
import {RegistryService} from "./registry.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SaasyInterceptor} from "../auth/saasy-interceptor";
import {OAuthModule} from "angular-oauth2-oidc";
import {MaterialModule} from "../material-module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import { RegistryItemComponent } from './registry-item/registry-item.component';

@NgModule({
  declarations: [
    RegistryComponent,
    RegistryItemComponent
  ],
  providers: [
    RegistryService,
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
        allowedUrls: ['http://localhost:9096/api/v1/','http://localhost:9094/','https://saasy-service.bluntsoftware.com/api/v1/'],
        sendAccessToken: true
      }
    }),
    RouterModule.forChild(registryRoutes),
  ]
})
export class RegistryModule { }
