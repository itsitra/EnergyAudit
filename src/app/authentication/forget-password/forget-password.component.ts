import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
// import { CustomValidators } from "../../../reusables/CustomValidators";
@Component({
  selector: "ngx-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  //form
  forgetPasswordForm: FormGroup;
  username = "";
  password = "";
  confirmPassword = "";
  mismatch: boolean = false;

  constructor() {}

  ngOnInit() {
    this.forgetPasswordForm = new FormGroup(
      {
        username: new FormControl("username", Validators.required),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
      }
      // this.pwdMatchValidator

      // CustomValidators.mustMatch("password", "confirmPassword")
    );
  }
  pwdMatchValidator(frm: FormGroup) {
    console.log("Sdf", frm.get("password").value);
    console.log("SDFSDFSDF", frm.get("confirmPassword").value);

    let amigo =
      frm.get("password").value === frm.get("confirmPassword").value
        ? null
        : { mismatch: true };
    console.log("amigo", amigo);

    return frm.get("password").value === frm.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }
  forgetPassword() {}
}
