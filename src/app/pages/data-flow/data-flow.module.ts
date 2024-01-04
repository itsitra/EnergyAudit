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
import { Flow1Component } from "./flow1/flow1.component";
import { Flow2Component } from "./flow2/flow2.component";
import { Flow3Component } from "./flow3/flow3.component";
import { Flow4Component } from "./flow4/flow4.component";
import { Flow5Component } from "./flow5/flow5.component";
import { Flow6Component } from "./flow6/flow6.component";
import { Flow7Component } from "./flow7/flow7.component";
import { Flow8Component } from "./flow8/flow8.component";
import { Flow9Component } from "./flow9/flow9.component";
import { Flow10Component } from "./flow10/flow10.component";
import { Flow11Component } from "./flow11/flow11.component";

@NgModule({
  declarations: [
    DataFlowComponent,
    FormPopupComponent,
    Flow1Component,
    Flow2Component,
    Flow3Component,
    Flow4Component,
    Flow5Component,
    Flow6Component,
    Flow7Component,
    Flow8Component,
    Flow9Component,
    Flow10Component,
    Flow11Component,
  ],
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
