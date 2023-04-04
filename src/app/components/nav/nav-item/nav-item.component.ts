import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavItem} from "./nav-item.model";
@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {


  @Output()
  navigationEmitter = new EventEmitter<NavItem>();
  opened: boolean = false;

  @Input('item')
  navItem!: NavItem;

  constructor() { }
  ngOnInit(): void {
  }

  expand(){
    this.opened = !this.opened;
  }

  onNavigation(navItem: NavItem) {
    this.navigationEmitter.emit(navItem);
  }
}
