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
} from "@nebular/theme";

@NgModule({
  declarations: [DataFlowComponent],
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
  ],
})
export class DataFlowModule {}
