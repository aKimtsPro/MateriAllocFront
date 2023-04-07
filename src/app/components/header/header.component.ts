import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDrawer} from "@angular/material/sidenav";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input()
  navDrawer!: MatDrawer;

  constructor(public authService: AuthService, private readonly _snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  noImpl(){
    this._snackbar.error("not implemented")
  }
}
