import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFlowComponent } from './data-flow.component';

const routes: Routes = [{ path: '', component: DataFlowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFlowRoutingModule { }
