import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataFlowRoutingModule } from "./data-flow-routing.module";
import { DataFlowComponent } from "./data-flow.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbActionsModule,
} from "@nebular/theme";
import { FormPopupComponent } from "./form-popup/form-popup.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [DataFlowComponent, FormPopupComponent],
  imports: [
    CommonModule,
    DataFlowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    MatDialogModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbActionsModule,
  ],
})
export class DataFlowModule {}
