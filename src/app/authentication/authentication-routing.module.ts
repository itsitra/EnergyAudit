import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthenticationLayout } from "./authentication.component";
import { RegisterComponent } from "./register/register.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
const routes: Routes = [
  {
    path: "",
    component: AuthenticationLayout,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "forget-password",
        component: ForgetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
