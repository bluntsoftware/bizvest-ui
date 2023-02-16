import { Component, OnInit } from '@angular/core';
import {Registrar, RegistryService} from "./registry.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  registrars:Array<Registrar> = [];
  constructor(private registryService:RegistryService,private router: Router) { }

  ngOnInit(): void {
    this.registryService.search().subscribe(d=>{
      this.registrars = d.content;
    })
  }

  show(id: string | null) {
    let url = '/registry/' + id;
    this.router.navigate([url]).then();
  }
}
