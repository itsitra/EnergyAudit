import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "ngx-form-popup",
  templateUrl: "./form-popup.component.html",
  styleUrls: ["./form-popup.component.scss"],
})
export class FormPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FormPopupComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.LevelData.formDatas.length === 0) {
      return;
    }
    console.log("datas:", this.data);
  }

  // check if all required fields are filled
  checkRequiredFields() {
    let notfilledDatas = this.data.LevelData.formDatas.filter((field: any) => {
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
    console.log("notfilled:", this.checkRequiredFields());
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
  LevelData: any;
}
