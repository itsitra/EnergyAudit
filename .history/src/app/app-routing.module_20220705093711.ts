import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { AuthenticationLayout } from "./authentication/authentication.component";
import { LoginComponent } from "./authentication/login/login.component";
import { MillManagementComponent } from "./pages/main/MillManagement/mill-management.component";
// import { MillManagementComponent } from "./SitraPages/mill-management/mill-management.component";
import { AuthGuardGuard } from "./authentication/auth-guard.guard";
import { PagesGuard } from "./pages/pages.guard";

export const routes: Routes = [
  {
    path: "auth",
    canActivate: [PagesGuard],
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "pages",
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },

  // {
  //   path: "auth",
  //   component: AuthenticationLayout,
  //   children: [
  //     {
  //       path: "",
  //       component: LoginComponent,
  //     },
  //   ],
  // },
  {
    path: "authnode",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: NbLoginComponent,
      },
      {
        path: "login",
        component: NbLoginComponent,
      },
      {
        path: "register",
        component: NbRegisterComponent,
      },
      {
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent,
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent,
      },
      {
        path: "MillManagement",
        component: MillManagementComponent,
      },
    ],
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import(
        "./pages/demo/master-transformers/master-transformers.module"
      ).then((m) => m.MasterTransformersModule),
  },
  { path: 'data-flow', loadChildren: () => import('./pages/data-flow/data-flow.module').then(m => m.DataFlowModule) },
  { path: "**", redirectTo: "pages" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
