import { Route } from '@angular/router';
import {RegistryComponent} from "./registry.component";
import {RegistryItemComponent} from "./registry-item/registry-item.component";


export const registryRoutes: Route[] = [
  {
    path     : '',
    component: RegistryComponent,
    children:[
      { path: ':id', component: RegistryItemComponent}
    ]
  }
];
