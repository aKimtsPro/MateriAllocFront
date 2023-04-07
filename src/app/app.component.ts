import { Component } from '@angular/core';
import {NavItem} from "./components/nav/nav-item/nav-item.model";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(readonly authService: AuthService) {}

}
