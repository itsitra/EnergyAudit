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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>,
    private flowService: FlowapiService
  ) {}

  ngOnInit(): void {
    if (typeof this.data.levelDetail.Level_Table !== "undefined") {
      this.flowService
        .GetDynamicFields({ ScreenNo: this.data.levelDetail.Level_Table })
        .subscribe((result: any) => {
          if (result.length > 0) {
            result.forEach((data: any) => {
              // check if the field is already exist
              let dataExist = levelData.formDatas.filter((field: any) => {
                return data.Field_Name === field.fieldName;
              });
              if (dataExist.length === 0) {
                levelData.formDatas.push({
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
            // open the form popup
            const dialogRef = this.dialog.open(FormPopupComponent, {
              panelClass: "form-popup",
              data: { LevelData: levelData },
            });
            dialogRef.afterClosed().subscribe((result: any) => {
              if (typeof result != "undefined") {
                if (result.data.status === "saved") {
                  levelData.formDatas = result.data.formData;
                  levelData.nextButtonEnnable = true;
                }
                console.log("result:", this.flowData);
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
