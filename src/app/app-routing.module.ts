import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {RequestComponent} from "./components/request/request.component";
import {CreateRequestComponent} from "./components/request/create-request/create-request.component";
import {LOGGED_GUARD, LoggedInGuard, NOT_LOGGED_GUARD} from "./guards/logged-in.guard";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [NOT_LOGGED_GUARD] },
  {
    path: "request",
    children: [
      { path: "", component: RequestComponent, pathMatch:"full" },
      { path: "pending", component: RequestComponent, data: { status: "PENDING" } },
      { path: "accepted", component: RequestComponent, data: { status: "ACCEPTED" } },
      { path: "refused", component: RequestComponent, data: { status: "REFUSED" } },
      { path: "relocating", component: RequestComponent, data: { status: "RELOCATING" } },
      { path: "create", component: CreateRequestComponent },
    ],
    canActivate: [ LOGGED_GUARD ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
