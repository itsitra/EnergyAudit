import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-dataflow-popup",
  templateUrl: "./dataflow-popup.component.html",
  styleUrls: ["./dataflow-popup.component.scss"],
})
export class DataflowPopupComponent implements OnInit {
  customerId: string = "";
  customerList: any = [];
  constructor() {}

  ngOnInit(): void {}

  continue() {}
}
