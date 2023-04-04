import {Component, Input, OnInit} from '@angular/core';
import {NavItem} from "./nav-item/nav-item.model";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  navDrawer!: MatDrawer;

  navItems: NavItem[] = [
    {
      name: "requests",
      url: "/request",
      children: [
        {
          name: "pending",
          url: "/request/pending"
        },
        {
          name: "accepted",
          url: "/request/accepted"
        },
        {
          name: "relocating",
          url: "/request/relocating"
        },
        {
          name: "refused",
          url: "/request/refused"
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onNavigation(){
    this.navDrawer.close();
  }
}
