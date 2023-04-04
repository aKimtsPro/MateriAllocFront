import { Component } from '@angular/core';
import {NavItem} from "./components/nav/nav-item/nav-item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'materialloc-fe';
  showFiller = false;

}
