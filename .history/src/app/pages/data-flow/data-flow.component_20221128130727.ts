import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-data-flow",
  templateUrl: "./data-flow.component.html",
  styleUrls: ["./data-flow.component.scss"],
})
export class DataFlowComponent implements OnInit {
  activeTabId: string = "1";
  customerId: string = "";
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    let Customer = localStorage.getItem("activeCustomerId");
    if (typeof Customer !== "undefined" && Customer !== "") {
      this.customerId = Customer;
    } else {
      this.router.navigateByUrl("/pages/data-flow");
    }
  }

  // tab change event handle
  tabChanging(event: any) {
    this.activeTabId = event.tabId;
  }
}
