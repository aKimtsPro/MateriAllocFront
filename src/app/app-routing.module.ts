import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {RequestComponent} from "./components/request/request.component";
import {CreateRequestComponent} from "./components/request/create-request/create-request.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "request", children: [
      { path: "", component: RequestComponent, pathMatch:"full" },
      { path: "pending", component: RequestComponent, data: { status: "PENDING" } },
      { path: "accepted", component: RequestComponent, data: { status: "ACCEPTED" } },
      { path: "refused", component: RequestComponent, data: { status: "REFUSED" } },
      { path: "relocating", component: RequestComponent, data: { status: "RELOCATING" } },
      { path: "create", component: CreateRequestComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
