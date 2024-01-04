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
  displayForm: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>,
    private flowService: FlowapiService
  ) {}

  ngOnInit(): void {
    if (
      typeof this.data.levelDetail.Level_Table !== "undefined" &&
      typeof this.data.levelDetail.Item_Data[this.data.activeIndex] !==
        "undefined"
    ) {
      // load all form fields
      this.flowService
        .GetDynamicFields({ ScreenNo: this.data.levelDetail.Level_Table })
        .subscribe((result: any) => {
          if (result.length > 0) {
            this.displayForm = true;
            result.forEach((data: any) => {
              // check if the field is already exist
              let dataExist = this.data.levelDetail.Item_Data[
                this.data.activeIndex
              ].formDatas.filter((field: any) => {
                return data.Field_Name === field.fieldName;
              });
              if (dataExist.length === 0) {
                this.data.levelDetail.Item_Data[
                  this.data.activeIndex
                ].formDatas.push({
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
          }
        });
    }
    console.log("this.data.LevelData:", this.data.levelDetail);
  }

  // check if all required fields are filled
  checkRequiredFields() {
    // let notfilledDatas = this.data.LevelData.formDatas.filter((field: any) => {
    //   return field.mandatory === "1" && field.fieldValue === "";
    // });
    // if (notfilledDatas.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  // save the form data
  saveData() {
    // if (!this.checkRequiredFields()) {
    //   this.dialogRef.disableClose = true;
    //   this.dialogRef.close({
    //     event: "close",
    //     data: {
    //       status: "saved",
    //       formData: this.data.LevelData.formDatas,
    //     },
    //   });
    // } else {
    //   this.updateErrorFields();
    // }
  }

  // update the error fields
  updateErrorFields() {
    // this.data.LevelData.formDatas.forEach((data: any) => {
    //   data.isError = false;
    // });
    // let notfilledDatas = this.data.LevelData.formDatas.filter((field: any) => {
    //   return field.mandatory === "1" && field.fieldValue === "";
    // });
    // notfilledDatas.forEach((data: any) => {
    //   data.isError = true;
    // });
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
  levelDetail: any;
  activeIndex: number;
}
