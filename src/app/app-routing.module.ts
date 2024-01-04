import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuardGuard } from "./guard/authGuard/auth-guard.guard";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "pages",
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "auth" },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
