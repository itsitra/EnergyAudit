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
  displayName: string = "";
  itemName: string = "";
  loader: boolean = false;
  dataFound: boolean = false;
  readonlyFields: any = ["PT_Make"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>,
    private flowService: FlowapiService
  ) {}

  ngOnInit(): void {
    this.displayName = this.data.displayName;
    this.itemName = this.data.itemName;
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
                if (data.Field_Name !== "PT_Id") {
                  this.data.formData.push({
                    displayName: data.DispName,
                    fieldName: data.Field_Name,
                    mandatory: data.Mandatory,
                    screenNo: data.ScreenNo,
                    dataType: data.DataType,
                    fieldValue: this.readonlyFields.includes(data.Field_Name)
                      ? this.itemName
                      : "",
                    isError: false,
                    readOnly: this.readonlyFields.includes(data.Field_Name)
                      ? true
                      : false,
                  });
                }
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
      let customerId = this.data.customerId;
      let payloadObject = {
        custid: customerId,
        FlowNo: 1,
        LevelNo: 1,
        Level_Sno: 1,
      };
      this.data.formData.forEach((data: any) => {
        payloadObject[data.fieldName] = data.fieldValue;
      });
      console.log("fieldValues:", payloadObject);
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
  customerId: string;
  itemId: number;
  Flow_No: number;
  Level_No: number;
  Level_Sno: number;
}
