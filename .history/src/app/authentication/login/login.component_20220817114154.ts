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
  usernameError = "";
  passwordError = "";
  public err: boolean;
  rememberme: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthapiService,
    private Authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLoginForm();
    // this.formLogin = new FormGroup({
    //   username: new FormControl("username", Validators.required),
    //   password: new FormControl(null, Validators.required),
    // });
    //remeber me
    if (
      localStorage.getItem("doRemember") &&
      localStorage.getItem("Remembername")
    ) {
      let saveState = localStorage.getItem("doRemember");
      if (saveState == "true") {
        this.username = localStorage.getItem("Remembername");
        this.rememberme = true;
      }
    }
  }

  loadLoginForm() {
    //load form
    // this.formLogin = this.formBuilder.group({
    //   username: [""],
    //   password: [""],
    // });
  }

  // login button enable condition
  checkDisable() {
    if (this.username === "" || this.password === "") {
      return true;
    } else {
      return false;
    }
  }

  rememberMe() {
    this.rememberme == !this.rememberme;
  }
  //Form submit
  loginSubmit(formLogin: any) {
    // let formData = new FormData();

    if (!formLogin.invalid) {
      // for (const key of Object.keys(this.formLogin.value)) {
      //   const value = this.formLogin.value[key];
      //   formData.append(key, value);
      // }
      // console.log("this new data---------", formData);
      let FormValue = formLogin.value;
      // console.log("kk", FormValue);
      console.log("FormValue", FormValue);
      //api call
      this.AuthService.Login(FormValue).subscribe(
        (res) => {
          console.log(">>>>>>>>>>>>>>>>", res);
          if (res.status && res.status == true) {
            // window.location.href = res.data;
            let userID = res.id;
            let status = res.status;
            let role = res.Category;
            this.Authentication.getToken(
              this.rememberme,
              this.username,
              userID,
              status,
              role
            );
            if (res.Category == "Customer") {
              this.router.navigateByUrl("pages/data-flow");
            } else {
              this.router.navigateByUrl("pages/User-Management");
            }
          } else {
            console.log(res.message);
            this.err = res.message;
            console.log("sdf", this.err);
          }

          console.log("Res ddata==", res);
        },
        (error) => {
          // this.showError(error);

          console.log("errer", error);
        }
      );
    }
  }
}
