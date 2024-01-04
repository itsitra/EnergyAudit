import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataFlowRoutingModule } from './data-flow-routing.module';
import { DataFlowComponent } from './data-flow.component';


@NgModule({
  declarations: [
    DataFlowComponent
  ],
  imports: [
    CommonModule,
    DataFlowRoutingModule
  ]
})
export class DataFlowModule { }
