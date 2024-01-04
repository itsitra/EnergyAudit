import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserapiService } from "../../Service/API/User.Service";

@Component({
  selector: "ngx-dataflow-popup",
  templateUrl: "./dataflow-popup.component.html",
  styleUrls: ["./dataflow-popup.component.scss"],
})
export class DataflowPopupComponent implements OnInit {
  customerId: string = "";
  customerList: any = [];

  constructor(
    private UserApi: UserapiService,
    private dialogRef: MatDialogRef<DataflowPopupComponent>
  ) {}

  ngOnInit(): void {
    this.UserApi.userList().subscribe((data) => {
      let userDatas = data;
      this.customerList = userDatas.filter((data: any) => {
        return data.Category === "Customer" && data.username !== "";
      });
    });
  }

  continue() {
    this.dialogRef.close({
      data: {
        status: "closed",
        customerId: this.customerId,
      },
    });
  }
}
