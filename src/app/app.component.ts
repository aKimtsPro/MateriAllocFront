import { Component } from '@angular/core';
import {NavItem} from "./components/nav-item/nav-item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'materialloc-fe';
  showFiller = false;

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

}
