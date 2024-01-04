import { Component, OnInit } from "@angular/core";
import { NbMenuService } from "@nebular/theme";
import { MENU_ITEMS } from "./pages-menu";
import { MatDialog } from "@angular/material/dialog";
// import { QuestionnaireComponent } from "../pages/questionnaire/questionnaire.component";
import { AuditPopupComponent } from "../pages/audit-popup/audit-popup.component";
import { DataflowPopupComponent } from "../pages/dataflow-popup/dataflow-popup.component";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="menuItem.length > 0" [items]="menuItem"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(
    private menuService: NbMenuService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  // menu = MENU_ITEMS;
  menuItem = [];
  ngOnInit() {
    this.filerMenu();
    // console.log()
    this.menuService.onItemClick().subscribe((data) => {
      if (data.item.link === undefined) {
        this.openModalbox(data.item.title);
      }
    });
  }

  filerMenu() {
    let currentUserRole = localStorage.getItem("Category");
    // console.log(">>>>>>>>>>>", currentUserRole);
    let activeList = [];
    let Super_admin = [
      "dataFlow",
      "MillManagement",
      "AuditManagement",
      "UnitManagement",
      "User-Management",
      "Select-Audit",
      "Questionnaire-Management",
      "Observation-Management",
      "Intermediate-Management",
    ];
    let Staff = [
      "dataFlow",
      "MillManagement",
      "AuditManagement",
      "UnitManagement",
      "Questionnaire-Management",
      "Observation-Management",
      "Intermediate-Management",
      "Select-Audit",
      // "User-Management",
    ];
    let Customer = [
      "dataFlow",
      "Questionnaire-Management",
      "Observation-Management",
      "Intermediate-Management",
      "Select-Audit",
      // "MillManagement",
      // "AuditManagement",
      // "UnitManagement",
      // "User-Management",
    ];
    console.log("menu", MENU_ITEMS);
    if (currentUserRole == "Super_admin") {
      activeList = Super_admin;
    } else if (currentUserRole == "Staff") {
      activeList = Staff;
    } else {
      activeList = Customer;
    }

    MENU_ITEMS.forEach((menu) => {
      if (activeList.includes(menu.title)) {
        this.menuItem.push(menu);
      }
    });
  }

  openModalbox(title: string) {
    if (title === "Questionnaire-Management") {
      let Audit_id = localStorage.getItem("AuditId");
      let Mill_id = localStorage.getItem("MillId");
      let Questionaire_Id = localStorage.getItem("QuestionaireId");
      let Costomer_Id = localStorage.getItem("CustId");
      console.log("Questionaire_Id", Questionaire_Id, typeof Questionaire_Id);
      console.log("Questionaire_Id>>>>", Questionaire_Id == "");
      if (
        Audit_id == null ||
        Mill_id == null ||
        Costomer_Id == null ||
        Questionaire_Id == "" ||
        Questionaire_Id == null
      ) {
        const dialogRef = this.dialog.open(AuditPopupComponent, {
          width: "800px",
          height: "600px",
          panelClass: "form-popup98",
          data: {
            key: 1,
          },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          if (typeof result != "undefined") {
            if (result.data.status === "closed") {
              this.router.navigateByUrl(
                `pages/${title}/${result.data.Audit}/${result.data.Mill}/${result.data.Questionnaire}/${result.data.Customer}`
              );
            }
          }
        });
      } else if (
        Audit_id !== null &&
        Mill_id !== null &&
        Costomer_Id !== null &&
        Questionaire_Id !== "" &&
        Questionaire_Id !== null
      ) {
        this.router.navigateByUrl(
          `pages/${title}/${Audit_id}/${Mill_id}/${Questionaire_Id}/${Costomer_Id}`
        );
      }
    }
    if (title === "Select-Audit") {
      const dialogRef = this.dialog.open(AuditPopupComponent, {
        width: "800px",
        height: "600px",
        panelClass: "form-popup98",
        data: {
          key: 0,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (typeof result != "undefined") {
          if (result.data.status === "closed") {
            console.log("result.data", result.data);
            localStorage.setItem("AuditId", result.data.Audit);
            localStorage.setItem("MillId", result.data.Mill);
            localStorage.setItem("CustId", result.data.Customer);
            localStorage.setItem("ObservableId", result.data.Observable);
            localStorage.setItem("QuestionaireId", result.data.Questionnaire);
            localStorage.setItem("IntermediateId", result.data.Intermediate);
          }
        }
      });
    }
    if (title === "Observation-Management") {
      let Audit_id = localStorage.getItem("AuditId");
      let Mill_id = localStorage.getItem("MillId");
      let Observable_Id = localStorage.getItem("ObservableId");
      let Costomer_Id = localStorage.getItem("CustId");
      if (
        Audit_id == null ||
        Mill_id == null ||
        Costomer_Id == null ||
        Observable_Id == "" ||
        Observable_Id == null
      ) {
        const dialogRef = this.dialog.open(AuditPopupComponent, {
          width: "800px",
          height: "500px",
          panelClass: "form-popup",
          data: {
            key: 2,
          },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          if (typeof result != "undefined") {
            console.log("sdknasjdhba", Audit_id);
            if (result.data.status === "closed") {
              this.router.navigateByUrl(
                `pages/${title}/${result.data.Audit}/${result.data.Mill}/${result.data.Observable}/${result.data.Customer}`
              );
            }
          }
        });
      } else if (
        Audit_id !== null &&
        Mill_id !== null &&
        Costomer_Id !== null &&
        Observable_Id !== "" &&
        Observable_Id !== null
      ) {
        this.router.navigateByUrl(
          `pages/${title}/${Audit_id}/${Mill_id}/${Observable_Id}/${Costomer_Id}`
        );
      }
    }
    if (title === "Intermediate-Management") {
      let Audit_id = localStorage.getItem("AuditId");
      let Mill_id = localStorage.getItem("MillId");
      let Intermediate_Id = localStorage.getItem("IntermediateId");
      let Costomer_Id = localStorage.getItem("CustId");
      if (
        Audit_id == null ||
        Mill_id == null ||
        Costomer_Id == null ||
        Intermediate_Id == "" ||
        Intermediate_Id == null
      ) {
        const dialogRef = this.dialog.open(AuditPopupComponent, {
          width: "800px",
          height: "500px",
          panelClass: "form-popup98",
          data: {
            key: 3,
          },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          if (typeof result != "undefined") {
            if (result.data.status === "closed") {
              this.router.navigateByUrl(
                `pages/${title}/${result.data.Audit}/${result.data.Mill}/${result.data.Intermediate}/${result.data.Customer}`
              );
            }
          }
        });
      } else if (
        Audit_id !== null &&
        Mill_id !== null &&
        Costomer_Id !== null &&
        Intermediate_Id !== "" &&
        Intermediate_Id !== null
      ) {
        this.router.navigateByUrl(
          `pages/${title}/${Audit_id}/${Mill_id}/${Intermediate_Id}/${Costomer_Id}`
        );
      }
    }
    if (title === "dataFlow") {
      const dialogRef = this.dialog.open(DataflowPopupComponent, {
        width: "800px",
        height: "500px",
        panelClass: "form-popup98",
        data: {
          key: 3,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (typeof result != "undefined") {
          if (result.data.status === "closed") {
            localStorage.setItem("activeCustomerId", result.data.customerId);
          }
        }
      });
    }
  }
}
