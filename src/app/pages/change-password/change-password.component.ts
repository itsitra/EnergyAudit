import { Component, OnInit } from "@angular/core";
import { UserapiService } from "../../Service/API/User.Service";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  formFields: any = {
    passwordValue: "",
    passwordError: false,
    passwordErrorMsg: "",
    cpasswordValue: "",
    cpasswordError: false,
    cpasswordErrorMsg: "",
  };
  userId: string = "";
  config: NbToastrConfig;

  constructor(
    private userService: UserapiService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
  }

  submitForm() {
    this.formFields.passwordError = false;
    this.formFields.passwordErrorMsg = "";
    this.formFields.cpasswordError = false;
    this.formFields.cpasswordErrorMsg = "";

    if (this.formFields.passwordValue === "") {
      this.formFields.passwordError = true;
      this.formFields.passwordErrorMsg = "* New password is required.";
    } else if (this.formFields.cpasswordValue === "") {
      this.formFields.cpasswordError = true;
      this.formFields.cpasswordErrorMsg = "* Confirm password is required.";
    } else {
      if (this.formFields.passwordValue !== this.formFields.cpasswordValue) {
        this.formFields.cpasswordError = true;
        this.formFields.cpasswordErrorMsg =
          "* Password and Confirm password should be same.";
      } else {
        let formData = {
          id: this.userId,
          password: this.formFields.passwordValue,
        };

        this.userService.ChangePassword(formData).subscribe((result: any) => {
          this.formFields.passwordValue = "";
          this.formFields.cpasswordValue = "";
          let message = "Password changed successfully!";
          this.showToast("success", "Success!", message);
        });
      }
    }
  }

  // show the toast message
  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
