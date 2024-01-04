import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTreeGridModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
// import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MillManagementComponent } from "./MillManagement/mill-management.component";
import { AuditManagementComponent } from "./audit-management/audit-management.component";
import { UnitManagementComponent } from "./unit-management/unit-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewComponent } from './view/view/view.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { ObservationComponent } from './observation/observation.component';
import { AuditPopupComponent } from './audit-popup/audit-popup.component';
import { DataflowPopupComponent } from './dataflow-popup/dataflow-popup.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbIconModule,
    NbRadioModule,
    NbDatepickerModule,
    DashboardModule,
    NbMenuModule,
    // ECommerceModule,
    // MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    MillManagementComponent,
    AuditManagementComponent,
    UnitManagementComponent,
    UserManagementComponent,
    ViewComponent,
    QuestionnaireComponent,
    IntermediateComponent,
    ObservationComponent,
    AuditPopupComponent,
    DataflowPopupComponent,
  ],
})
export class PagesModule {}
