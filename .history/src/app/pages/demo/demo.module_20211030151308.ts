import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoRoutingModule } from "./demo-routing.module";
import { DemoComponent } from "./demo.component";
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
  NbInputModule,
  NbAlertModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { TransformerFormComponent } from "./transformer-form/transformer-form.component";
import { DistributionFormComponent } from "./distribution-form/distribution-form.component";
import { PowerhouseFormComponent } from "./powerhouse-form/powerhouse-form.component";

@NgModule({
  declarations: [
    DemoComponent,
    TransformerFormComponent,
    DistributionFormComponent,
    PowerhouseFormComponent,
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbInputModule,
    NbAlertModule,
  ],
})
export class DemoModule {}
