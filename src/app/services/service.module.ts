import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Config} from "./config";
import {ThemeService} from "./theme.service";
import {BusinessService} from "./business.service";

@NgModule({
  providers: [
    ThemeService,
		BusinessService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {
  public static forRoot(environment: any): Config{
    return new Config(environment);
  }
}
