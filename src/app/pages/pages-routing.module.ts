import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MillManagementComponent } from "./MillManagement/mill-management.component";
import { AuditManagementComponent } from "./audit-management/audit-management.component";
import { UnitManagementComponent } from "./unit-management/unit-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { ObservationComponent } from "./observation/observation.component";
import { IntermediateComponent } from "./intermediate/intermediate.component";
import { AuditPopupComponent } from "./audit-popup/audit-popup.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "User-Management",
        component: UserManagementComponent,
      },
      // {
      //   path: "AuditPopup/:type",
      //   component: AuditPopupComponent,
      // },
      {
        path: "Questionnaire-Management/:Audit/:Mill/:Screen/:CustId",
        component: QuestionnaireComponent,
      },
      {
        path: "Observation-Management/:Audit/:Mill/:Screen/:CustId",
        component: ObservationComponent,
      },
      {
        path: "Intermediate-Management/:Audit/:Mill/:Screen/:CustId",
        component: IntermediateComponent,
      },
      {
        path: "Unit-Management",
        component: UnitManagementComponent,
      },
      {
        path: "Audit-Management",
        component: AuditManagementComponent,
      },
      {
        path: "Mill-Management",
        component: MillManagementComponent,
      },
      {
        path: "data-flow",
        loadChildren: () =>
          import("./data-flow/data-flow.module").then((m) => m.DataFlowModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
