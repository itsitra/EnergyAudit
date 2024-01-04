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
  activeParentKey: string = "";
  activeParentId: number = null;
  primaryKey: string = "";
  screenNumber: string = "";
  loader: boolean = false;
  dataFound: boolean = false;
  skipColumns: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>,
    private flowService: FlowapiService
  ) {}

  ngOnInit(): void {
    this.displayName = this.data.displayName;
    this.itemName = this.data.itemName;
    this.activeParentId = this.data.activeParentId;
    this.activeParentKey = this.data.activeParentKey;
    this.primaryKey = this.data.primaryKey;
    this.screenNumber = this.data.screenNumber;
    this.skipColumns = this.data.skipColumns;
    this.loader = true;
    console.log("datas:", this.data);
    this.loadFormFields();
  }

  // load the form fields
  loadFormFields() {
    this.flowService
      .GetDynamicFields({ ScreenNo: this.data.screenNumber })
      .subscribe(
        (result: any) => {
          if (result.length > 0) {
            this.formFieldsHandle(result);
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

  // handle the form fields
  formFieldsHandle(formFields: any) {
    formFields.forEach((data: any) => {
      console.log("data.Field_Name:", data.Field_Name);
      if (
        data.Field_Name !== this.activeParentKey &&
        data.Field_Name !== this.primaryKey &&
        !this.skipColumns.includes(data.Field_Name)
      ) {
        // check if the field is already exist
        let dataExist = this.data.formData.filter((field: any) => {
          return data.Field_Name === field.fieldName;
        });
        if (dataExist.length === 0) {
          let fieldValue = "";
          let fieldDisable = false;
          let tempFormData = this.data.tempformData;
          if (data.Field_Name === this.data.fieldNameKey) {
            fieldValue = this.itemName;
            fieldDisable = true;
          }
          if (typeof tempFormData[data.Field_Name] !== "undefined") {
            fieldValue = this.data.tempformData[data.Field_Name];
          }
          this.data.formData.push({
            displayName: data.DispName,
            fieldName: data.Field_Name,
            mandatory: data.Mandatory,
            screenNo: data.ScreenNo,
            dataType: data.DataType,
            fieldValue: fieldValue,
            isError: false,
            readOnly: fieldDisable,
          });
        } else {
          // changed item name load here
          if (data.Field_Name === this.data.fieldNameKey) {
            let findIndex = this.data.formData.findIndex((field: any) => {
              return field.fieldName === data.Field_Name;
            });
            if (findIndex > -1) {
              this.data.formData[findIndex].fieldValue = this.itemName;
            }
          }
        }
      }
    });
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

  // save the form data
  saveData() {
    if (!this.checkRequiredFields()) {
      let customerId = this.data.customerId;
      let Flow_No = this.data.Flow_No;
      let Level_No = this.data.Level_No;
      let Level_Sno = this.data.Level_Sno;
      let ItemId = this.data.itemId;

      // default payload
      let payloadObject = {
        custid: customerId.toString(),
        FlowNo: Flow_No.toString(),
        LevelNo: Level_No.toString(),
        Level_Sno: Level_Sno.toString(),
      };

      // add primary key for update form data
      if (ItemId !== null) {
        payloadObject[this.primaryKey] = ItemId;
      }

      // map the parent key for tree mapping
      if (this.activeParentId !== null) {
        payloadObject[this.activeParentKey] = this.activeParentId;
      }

      // make the form data using the fields
      this.data.formData.forEach((data: any) => {
        payloadObject[data.fieldName] = data.fieldValue.toString();
      });

      if (ItemId === null) {
        //add the form data
        this.flowService
          .addFormDatas(payloadObject)
          .subscribe((result: any) => {
            this.dialogRef.disableClose = true;
            this.dialogRef.close({
              event: "close",
              data: {
                status: "saved",
                itemId: result,
                formData: this.data.formData,
              },
            });
          });
      } else {
        // update the form data
        this.flowService
          .updateFormDatas(payloadObject)
          .subscribe((result: any) => {
            if (result === true) {
              this.dialogRef.disableClose = true;
              this.dialogRef.close({
                event: "close",
                data: {
                  status: "saved",
                  itemId: this.data.itemId,
                  formData: this.data.formData,
                },
              });
            }
            console.log("updateresult:", result);
          });
      }
    } else {
      this.updateErrorFields();
    }
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
  tempformData: any;
  itemName: string;
  displayName: string;
  customerId: string;
  itemId: number;
  Flow_No: number;
  Level_No: number;
  Level_Sno: number;
  primaryKey: string;
  fieldNameKey: string;
  skipColumns: any;
  activeParentKey: string;
  activeParentId: number;
}
