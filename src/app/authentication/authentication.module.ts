import { NgModule } from "@angular/core";
import { ThemeModule } from "../@theme/theme.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  // NbLayoutComponent,
  NbLayoutModule,
} from "@nebular/theme";
import { CommonModule } from "@angular/common";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationLayout } from "./authentication.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AuthenticationRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    // NbLayoutComponent,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    LoginComponent,
    AuthenticationLayout,
    RegisterComponent,
    ForgetPasswordComponent,
  ],
})
export class AuthenticationModule {}
