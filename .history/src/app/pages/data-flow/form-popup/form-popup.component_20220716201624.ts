import { Component, Inject, OnInit } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FlowapiService } from "../../../Service/API/Flow.Service";

@Component({
  selector: "ngx-form-popup",
  templateUrl: "./form-popup.component.html",
  styleUrls: ["./form-popup.component.scss"],
})
export class FormPopupComponent implements OnInit {
  itemName: string = "";
  loader: boolean = false;
  dataFound: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>,
    private flowService: FlowapiService
  ) {}

  ngOnInit(): void {
    this.itemName = this.data.displayName;
    this.loader = true;
    this.loadFormFields();
  }

  // load the form fields
  loadFormFields() {
    this.flowService
      .GetDynamicFields({ ScreenNo: this.data.screenNumber })
      .subscribe(
        (result: any) => {
          if (result.length > 0) {
            result.forEach((data: any) => {
              // check if the field is already exist
              let dataExist = this.data.formData.filter((field: any) => {
                return data.Field_Name === field.fieldName;
              });
              if (dataExist.length === 0) {
                this.data.formData.push({
                  displayName: data.DispName,
                  fieldName: data.Field_Name,
                  mandatory: data.Mandatory,
                  screenNo: data.ScreenNo,
                  dataType: data.DataType,
                  fieldValue: "",
                  isError: false,
                });
              }
            });
            this.loader = false;
            this.dataFound = true;
          } else {
            this.loader = false;
            this.dataFound = false;
          }
        },
        (error: any) => {
          this.loader = false;
          this.dataFound = false;
        }
      );
  }

  // check if all required fields are filled
  checkRequiredFields() {
    let notfilledDatas = this.data.formData.filter((field: any) => {
      return field.mandatory === "1" && field.fieldValue === "";
    });
    if (notfilledDatas.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // save the form data
  saveData() {
    if (!this.checkRequiredFields()) {
      console.log("formdata:", this.data.formData);
      // this.dialogRef.disableClose = true;
      // this.dialogRef.close({
      //   event: "close",
      //   data: {
      //     status: "saved",
      //     formData: this.data.LevelData.formDatas,
      //   },
      // });
    } else {
      this.updateErrorFields();
    }
  }

  // update the error fields
  updateErrorFields() {
    this.data.formData.forEach((data: any) => {
      data.isError = false;
    });
    let notfilledDatas = this.data.formData.filter((field: any) => {
      return field.mandatory === "1" && field.fieldValue === "";
    });
    notfilledDatas.forEach((data: any) => {
      data.isError = true;
    });
  }

  // close popup
  close() {
    this.dialogRef.disableClose = true;
    this.dialogRef.close({
      event: "close",
      data: {
        status: "closed",
      },
    });
  }
}

export interface DialogData {
  screenNumber: string;
  formData: any;
  itemName: string;
  displayName: string;
}
