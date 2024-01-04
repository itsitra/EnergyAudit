import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthapiService } from "../../Service/API/Auth.Service";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  //Form & inputs
  // formLogin: FormGroup;
  username = "";
  password = "";
  public err: boolean;
  rememberme: boolean = false;
  serviceError: boolean = false;
  serviceErrorText: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthapiService,
    private Authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceErrorHide();
  }
  serviceErrorHide() {
    this.serviceError = false;
    console.log("serrvice ", this.serviceError);
  }

  //Form submit
  loginSubmit(formLogin: any) {
    if (!formLogin.invalid) {
      let FormValue = formLogin.value;
      //api call
      this.AuthService.Login(FormValue).subscribe((res) => {
        console.log("login user data", res);
        if (res.status && res.status == true) {
          this.serviceError = false;
          let userID = res.id;
          let status = res.status;
          let Category = res.Category;
          this.Authentication.getToken(
            this.rememberme,
            this.username,
            userID,
            status,
            Category
          );
          localStorage.setItem("loginCategory", Category);
          if (res.Category == "Customer") {
            localStorage.setItem("activeCustomerId", userID);
            this.router.navigateByUrl("pages/data-flow");
          } else {
            this.router.navigateByUrl("pages/User-Management");
          }
        } else {
          this.serviceError = true;
          this.serviceErrorText = res.message;
          console.log("errolr message ", this.serviceErrorText);
        }
      });
    }
  }
}
