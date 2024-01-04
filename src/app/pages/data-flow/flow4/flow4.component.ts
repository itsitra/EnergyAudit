import { Component, Input, OnInit } from "@angular/core";
import { FlowapiService } from "../../../Service/API/Flow.Service";
import { FormPopupComponent } from "../form-popup/form-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { DataFlow, LevelDatas, Flow4path } from "../../../Model/DataflowModel";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-flow4",
  templateUrl: "./flow4.component.html",
  styleUrls: ["./flow4.component.scss"],
})
export class Flow4Component implements OnInit {
  flowData = new DataFlow();
  levelDetails = [];
  activeParentKey = "";
  activeParentId = "";
  activeLevelIndex = 0;
  flowPaths = new Flow4path().Data;
  loader: boolean = false;
  config: NbToastrConfig;
  childElements = [];
  @Input() customerId;

  constructor(
    private flowService: FlowapiService,
    public dialog: MatDialog,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadCurrentlevelDatas();
  }

  // get current level details
  getCurrentlevelDetails(levelData: any) {
    return this.levelDetails.filter((data: any) => {
      return (
        data.Flow_No === levelData.Flow_No &&
        data.Level_No === levelData.Level_No &&
        data.Level_Sno === levelData.Level_Sno
      );
    });
  }

  // load all current level datas
  loadCurrentlevelDatas() {
    this.levelDetails = [];
    let LevelData = this.flowData.Flow4.Data[this.activeLevelIndex];
    if (LevelData.Level_Data.length > 0) {
      LevelData.Level_Data.forEach((levelData: any) => {
        if (this.activeLevelIndex === 0) {
          this.loader = true;
          if (this.childElements.length > 0) {
            if (this.childElements.includes(levelData.Level_unique)) {
              this.getFirstLeveldatas(levelData);
            }
          } else {
            this.getFirstLeveldatas(levelData);
          }
        } else {
          this.loader = true;
          if (this.childElements.length > 0) {
            if (this.childElements.includes(levelData.Level_unique)) {
              this.getLevelDatas(levelData);
            }
          } else {
            this.getLevelDatas(levelData);
          }
        }
      });
    }
  }

  // get the first level datas
  getFirstLeveldatas(levelData: any) {
    let payloadObject = {
      custid: this.customerId,
      FlowNo: levelData.Flow_No,
      LevelNo: levelData.Level_No,
      Level_Sno: levelData.Level_Sno,
    };
    this.flowService.getLevelDatas(payloadObject).subscribe(
      (result: any) => {
        if (result.length > 0) {
          levelData.Item_Count = result.length;
          let count = 0;
          result.forEach((details: any) => {
            let Datas = new LevelDatas();
            Datas.Flow_No = levelData.Flow_No;
            Datas.Level_No = levelData.Level_No;
            Datas.Level_Sno = levelData.Level_Sno;
            Datas.Level_Index = levelData.Level_Index;
            Datas.ItemName = levelData.Item_Name;
            Datas.tableName = levelData.Level_Table;
            Datas.primaryKey = levelData.Level_Primary_Key;
            Datas.fieldNameKey = levelData.defaultNameField;
            Datas.ItemId = details[levelData.ItemKey];
            Datas.Name = details[levelData.defaultNameField];
            Datas.LevelContinue = levelData.LevelContinue;
            if (levelData.LevelContinue) {
              Datas.NextButtonEnableStatus = true;
            } else {
              Datas.NextButtonEnableStatus = false;
            }
            Datas.skipColumns = levelData.skipColumns;
            Datas.tempFormData = details;
            Datas.uniqueId = this.getUniqueId(levelData, count);
            Datas.childSno = levelData.child_Sno;
            this.levelDetails.push(Datas);
            count++;
          });
        }
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      }
    );
  }

  // get the given level datas
  getLevelDatas(levelData: any) {
    let payloadObject = {
      custid: this.customerId,
      FlowNo: levelData.Flow_No,
      LevelNo: levelData.Level_No,
      Level_Sno: levelData.Level_Sno,
    };
    payloadObject[this.activeParentKey] = this.activeParentId;

    this.flowService.getChildlevelDatas(payloadObject).subscribe(
      (result: any) => {
        if (result.length > 0) {
          levelData.Item_Count = result.length;
          let count = 0;
          result.forEach((details: any) => {
            let Datas = new LevelDatas();
            Datas.Flow_No = levelData.Flow_No;
            Datas.Level_No = levelData.Level_No;
            Datas.Level_Sno = levelData.Level_Sno;
            Datas.Level_Index = levelData.Level_Index;
            Datas.ItemName = levelData.Item_Name;
            Datas.tableName = levelData.Level_Table;
            Datas.primaryKey = levelData.Level_Primary_Key;
            Datas.fieldNameKey = levelData.defaultNameField;
            Datas.ItemId = details[levelData.ItemKey];
            Datas.Name = details[levelData.defaultNameField];
            Datas.LevelContinue = levelData.LevelContinue;
            if (levelData.LevelContinue) {
              Datas.NextButtonEnableStatus = true;
            } else {
              Datas.NextButtonEnableStatus = false;
            }
            Datas.tempFormData = details;
            Datas.skipColumns = levelData.skipColumns;
            Datas.uniqueId = this.getUniqueId(levelData, count);
            Datas.childSno = levelData.child_Sno;
            this.levelDetails.push(Datas);
            count++;
          });
        } else {
          levelData.Item_Count = 0;
        }
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      }
    );
  }

  // update the level count data
  LevelCountUpdateEvent(levelData: any) {
    let itemDatas = this.levelDetails.filter((data: any) => {
      return (
        data.Flow_No === levelData.Flow_No &&
        data.Level_No === levelData.Level_No &&
        data.Level_Sno === levelData.Level_Sno
      );
    });

    if (itemDatas.length === 0) {
      for (let i = 0; i < levelData.Item_Count; i++) {
        let Datas = new LevelDatas();
        Datas.Flow_No = levelData.Flow_No;
        Datas.Level_No = levelData.Level_No;
        Datas.Level_Sno = levelData.Level_Sno;
        Datas.Level_Index = levelData.Level_Index;
        Datas.ItemName = levelData.Item_Name;
        Datas.tableName = levelData.Level_Table;
        Datas.primaryKey = levelData.Level_Primary_Key;
        Datas.fieldNameKey = levelData.defaultNameField;
        Datas.LevelContinue = levelData.LevelContinue;
        Datas.skipColumns = levelData.skipColumns;
        Datas.uniqueId = this.getUniqueId(levelData, 0);
        Datas.childSno = levelData.child_Sno;
        this.levelDetails.push(Datas);
      }
    } else {
      let dataExisting = itemDatas.length;
      let dataCount = levelData.Item_Count;
      if (dataCount > dataExisting) {
        let Datas = new LevelDatas();
        Datas.Flow_No = levelData.Flow_No;
        Datas.Level_No = levelData.Level_No;
        Datas.Level_Sno = levelData.Level_Sno;
        Datas.Level_Index = levelData.Level_Index;
        Datas.ItemName = levelData.Item_Name;
        Datas.tableName = levelData.Level_Table;
        Datas.primaryKey = levelData.Level_Primary_Key;
        Datas.fieldNameKey = levelData.defaultNameField;
        Datas.LevelContinue = levelData.LevelContinue;
        Datas.skipColumns = levelData.skipColumns;
        Datas.uniqueId = this.getUniqueId(levelData, itemDatas.length);
        Datas.childSno = levelData.child_Sno;
        this.levelDetails.push(Datas);
      } else {
        let index = 0;
        itemDatas.forEach((data: any) => {
          if (index + 1 === itemDatas.length) {
            let itemUniqueId = data.uniqueId;
            let itemIndex = this.levelDetails.findIndex((data: any) => {
              return data.uniqueId === itemUniqueId;
            });
            // last index remove check
            if (data.ItemId !== null) {
              this.deleteLevelItem(data, itemIndex, index + 1);
            } else {
              this.levelDetails.splice(itemIndex, 1);
            }
          }
          index++;
        });
      }
    }
  }

  // delete the level data
  deleteLevelItem(ItemData: any, index: number, displayIndex: number) {
    let payloadObject = {
      custid: this.customerId,
      FlowNo: ItemData.Flow_No,
      LevelNo: ItemData.Level_No,
      Level_Sno: ItemData.Level_Sno,
    };
    if (ItemData.ItemId !== null) {
      let primaryKey = ItemData.primaryKey;
      payloadObject[primaryKey] = ItemData.ItemId;
    }
    this.flowService.deleteFormDatas(payloadObject).subscribe(
      (result: any) => {
        if (result) {
          this.levelDetails.splice(index, 1);
          let displayName = ItemData.ItemName + " " + displayIndex;
          let message = displayName + " was removed successfully!";
          this.showToast("success", "Success!", message);
        }
      },
      (error: any) => {
        let message = "Server Error. Try again!";
        this.showToast("danger", "Error!", message);
      }
    );
  }

  // add for data for each level
  addFormDatas(levelDetail: any, index: number) {
    // open the form popup
    let screenNumber = levelDetail.tableName;
    let formData = levelDetail.FormData;
    let tempformData = levelDetail.tempFormData;
    let itemName = levelDetail.Name;
    let displayName = levelDetail.ItemName + " " + (index + 1);
    let itemId = levelDetail.ItemId;
    let Flow_No = levelDetail.Flow_No;
    let Level_No = levelDetail.Level_No;
    let Level_Sno = levelDetail.Level_Sno;
    let primaryKey = levelDetail.primaryKey;
    let fieldNameKey = levelDetail.fieldNameKey;
    let skipColumns = levelDetail.skipColumns;

    const dialogRef = this.dialog.open(FormPopupComponent, {
      panelClass: "form-popup",
      data: {
        screenNumber: screenNumber,
        formData: formData,
        tempformData: tempformData,
        itemName: itemName,
        displayName: displayName,
        customerId: this.customerId,
        itemId: itemId,
        Flow_No: Flow_No,
        Level_No: Level_No,
        Level_Sno: Level_Sno,
        primaryKey: primaryKey,
        fieldNameKey: fieldNameKey,
        skipColumns: skipColumns,
        activeParentKey: this.activeParentKey,
        activeParentId: this.activeParentId,
        formType: 2,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result != "undefined") {
        if (result.data.status === "saved") {
          levelDetail.formDatas = result.data.formData;
          levelDetail.ItemId = result.data.itemId;
          if (levelDetail.LevelContinue) {
            levelDetail.NextButtonEnableStatus = true;
          } else {
            levelDetail.NextButtonEnableStatus = false;
          }
        }
      }
    });
  }

  // navigate to the next level
  nextLevel(levelData: any) {
    if (levelData.LevelContinue) {
      this.activeParentId = levelData.ItemId;
      this.activeParentKey = levelData.primaryKey;
      this.activeLevelIndex = levelData.Level_Index + 1;
      this.childElements = levelData.childSno;
      this.flowPaths[this.activeLevelIndex] = {
        name: levelData.Name,
        activeIndex: this.activeLevelIndex,
        activeParentId: levelData.ItemId,
        activeParentKey: levelData.primaryKey,
        activeChildSno: levelData.childSno,
      };
      this.loadCurrentlevelDatas();
    }
  }

  // navigate to the particular level
  gotoLevel(pathData) {
    this.activeParentId = pathData.activeParentId;
    this.activeParentKey = pathData.activeParentKey;
    this.activeLevelIndex = pathData.activeIndex;
    this.childElements = pathData.activeChildSno;
    let newflowPath = [];
    for (let i = 0; i <= this.activeLevelIndex; i++) {
      newflowPath.push(this.flowPaths[i]);
    }
    this.flowPaths = newflowPath;
    this.loadCurrentlevelDatas();
  }

  // get unique id for each record
  getUniqueId(levelData: any, index: number) {
    return (
      levelData.Flow_No +
      "-" +
      levelData.Level_No +
      "-" +
      levelData.Level_Sno +
      "-" +
      index
    );
  }

  // check the level data exist
  displayCheck(levelData: any) {
    if (this.childElements.length > 0) {
      if (this.childElements.includes(levelData.Level_unique)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  // show the toast message
  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
