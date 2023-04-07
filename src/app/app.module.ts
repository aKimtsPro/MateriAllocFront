import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {NavItemComponent} from "./components/nav/nav-item/nav-item.component";
import {AppRoutingModule} from "./app-routing.module";
import { RequestComponent } from './components/request/request.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ActionsBtnComponent } from './components/request/actions-btn/actions-btn.component';
import { MaterialsMenuComponent } from './components/request/materials-menu/materials-menu.component';
import { ActionDrawerComponent } from './components/action-drawer/action-drawer.component';
import { ActionHostDirective } from './components/action-drawer/action-host/action-host.directive';
import {ActionService} from "./components/action-drawer/action.service";
import { AcceptActionComponent } from './components/action-drawer/accept-action/accept-action.component';
import { ConfirmActionComponent } from './components/action-drawer/confirm-action/confirm-action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateRequestComponent } from './components/request/create-request/create-request.component';
import { MatNativeDateModule} from "@angular/material/core";
import { NavComponent } from './components/nav/nav.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import {GlobalErrorHandlerService} from "./services/global-error-handler.service";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    NavItemComponent,
    RequestComponent,
    HomeComponent,
    ActionsBtnComponent,
    MaterialsMenuComponent,
    ActionDrawerComponent,
    ActionHostDirective,
    AcceptActionComponent,
    ConfirmActionComponent,
    CreateRequestComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
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
  providers: [
    ActionService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
