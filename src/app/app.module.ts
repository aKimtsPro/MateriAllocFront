import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {NavItemComponent} from "./components/nav-item/nav-item.component";
import {AppRoutingModule} from "./app-routing.module";
import { RequestComponent } from './components/request/request.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ActionsBtnComponent } from './components/request/actions-btn/actions-btn.component';
import { AcceptRequestComponent } from './components/accept-request/accept-request.component';
import { MaterialsMenuComponent } from './components/request/materials-menu/materials-menu.component';
import { ActionDrawerComponent } from './components/action-drawer/action-drawer.component';
import { ActionHostDirective } from './components/action-drawer/action-host/action-host.directive';
import {ActionService} from "./components/action-drawer/action.service";
import { AcceptActionComponent } from './components/action-drawer/accept-action/accept-action.component';
import { ConfirmActionComponent } from './components/action-drawer/confirm-action/confirm-action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateRequestComponent } from './components/request/create-request/create-request.component';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    NavItemComponent,
    RequestComponent,
    HomeComponent,
    ActionsBtnComponent,
    AcceptRequestComponent,
    MaterialsMenuComponent,
    ActionDrawerComponent,
    ActionHostDirective,
    AcceptActionComponent,
    ConfirmActionComponent,
    CreateRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [ ActionService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
