import { Component, OnInit } from "@angular/core";
import { UserapiService } from "../../Service/API/User.Service";

@Component({
  selector: "ngx-dataflow-popup",
  templateUrl: "./dataflow-popup.component.html",
  styleUrls: ["./dataflow-popup.component.scss"],
})
export class DataflowPopupComponent implements OnInit {
  customerId: string = "";
  customerList: any = [];

  constructor(private UserApi: UserapiService) {}

  ngOnInit(): void {
    this.UserApi.userList().subscribe((data) => {
      let userDatas = data;
      this.customerList = userDatas.filter((data: any) => {
        return data.Category === "Staff";
      });
      console.log("all user list", this.customerList);
    });
  }

  continue() {}
}
