import { Component, OnInit } from "@angular/core";
import { FlowapiService } from "../../Service/API/Flow.Service";
import { FormPopupComponent } from "../data-flow/form-popup/form-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { DataFlow, LevelDatas, FlowOnepath } from "../../Model/DataflowModel";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-data-flow",
  templateUrl: "./data-flow.component.html",
  styleUrls: ["./data-flow.component.scss"],
})
export class DataFlowComponent implements OnInit {
  flowData = new DataFlow();
  levelDetails = [];
  customerId = "1000054";
  activeParentKey = "";
  activeParentId = "";
  activeLevelIndex = 0;
  flowPaths = new FlowOnepath().Data;
  loader: boolean = false;
  config: NbToastrConfig;

  constructor(
    private flowService: FlowapiService,
    public dialog: MatDialog,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {}
}
