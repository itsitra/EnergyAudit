export class DataFlow {
  FlowOne = new FlowOne();
  FlowTwo = new FlowTwo();
}

export class LevelDatas {
  Flow_No: number = null;
  Level_No: number = null;
  Level_Sno: number = null;
  Level_Index: number = null;
  ItemId: number = null;
  tableName: string = "";
  primaryKey: string = "";
  Name: string = "";
  ItemName: string = "";
  fieldNameKey: string = "";
  NextButtonEnableStatus: boolean = false;
  LevelContinue: boolean = false;
  FormData: any = [];
  tempFormData: any = [];
  skipColumns: [];
}

export class FlowOne {
  Data = [
    {
      Flow_No: 1,
      Level_No: 1,
      Level_Name: "Power Transformer",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 1,
          Level_Sno: 1,
          Level_Table: "PT_DATA",
          Level_TabName: "pt_name_plate_details",
          Level_Primary_Key: "PT_Id",
          Item_Name: "Power Transformer",
          Item_Count: 0,
          ItemKey: "PT_Id",
          defaultNameField: "PT_Name",
          LevelContinue: true,
          Level_Index: 0,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 2,
      Level_Name: "Distribution Transformer",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 2,
          Level_Sno: 1,
          Level_Table: "DT_DATA",
          Level_TabName: "dt_name_plate_details",
          Level_Primary_Key: "DT_Id",
          Item_Name: "Distribution Transformer",
          Item_Count: 0,
          ItemKey: "DT_Id",
          defaultNameField: "DT_Name",
          LevelContinue: true,
          Level_Index: 1,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 3,
      Level_Name: "Power House",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 3,
          Level_Sno: 1,
          Level_Table: "PH_DATA",
          Level_TabName: "power_house_details",
          Level_Primary_Key: "PH_Id",
          Item_Name: "Power House",
          Item_Count: 0,
          ItemKey: "PH_Id",
          defaultNameField: "PH_Name",
          LevelContinue: true,
          Level_Index: 2,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 4,
      Level_Name: "MV Panel",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 4,
          Level_Sno: 1,
          Level_Table: "MV_DATA",
          Level_TabName: "mv_panel_details",
          Level_Primary_Key: "MV_Panel_Id",
          Item_Name: "MV Panel",
          Item_Count: 0,
          ItemKey: "MV_Panel_Id",
          defaultNameField: "MV_Panel_Name",
          LevelContinue: true,
          Level_Index: 3,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 5,
      Level_Name: "Capacitor / Department Feeder",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 5,
          Level_Sno: 1,
          Level_Table: "CAP_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Cap_id",
          Item_Name: "Capacitor",
          Item_Count: 0,
          ItemKey: "Cap_id",
          defaultNameField: "Cap_Name",
          LevelContinue: false,
          Level_Index: 4,
          skipColumns: ["Feeder_id"],
        },
        {
          Flow_No: 1,
          Level_No: 5,
          Level_Sno: 2,
          Level_Table: "FEEDER_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Feeder_id",
          Item_Name: "Department Feeder",
          Item_Count: 0,
          ItemKey: "Feeder_id",
          defaultNameField: "Feeder_Name",
          LevelContinue: true,
          Level_Index: 4,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 6,
      Level_Name: "Distribution Board / Capacitor",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 6,
          Level_Sno: 1,
          Level_Table: "DB_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Board_Id",
          Item_Name: "Distribution Board",
          Item_Count: 0,
          ItemKey: "Board_Id",
          defaultNameField: "DB_Name",
          LevelContinue: false,
          Level_Index: 5,
          skipColumns: [],
        },
        {
          Flow_No: 1,
          Level_No: 6,
          Level_Sno: 2,
          Level_Table: "CAP_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Cap_id",
          Item_Name: "Capacitor",
          Item_Count: 0,
          ItemKey: "Cap_id",
          defaultNameField: "Cap_Name",
          LevelContinue: false,
          Level_Index: 5,
          skipColumns: ["MV_Panel_Id"],
        },
      ],
    },
  ];
}

export class FlowOnepath {
  Data = [
    {
      name: "PowerTransformers",
      activeIndex: 0,
      activeParentId: "",
      activeParentKey: "",
    },
  ];
}

export class FlowTwo {
  Data = [
    {
      Flow_No: 2,
      Level_No: 1,
      Level_Name: "Humidification System",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 1,
          Level_Sno: 1,
          Level_Table: "HMP_DATA",
          Level_TabName: "humidification_plant",
          Level_Primary_Key: "HMP_Id",
          Item_Name: "Humidification System",
          Item_Count: 0,
          ItemKey: "HMP_Id",
          defaultNameField: "DP_Name",
          LevelContinue: true,
          Level_Index: 0,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 2,
      Level_No: 2,
      Level_Name: "MC",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 2,
          Level_Sno: 1,
          Level_Table: "MC_DATA",
          Level_TabName: "dt_name_plate_details",
          Level_Primary_Key: "DT_Id",
          Item_Name: "MC",
          Item_Count: 0,
          ItemKey: "DT_Id",
          defaultNameField: "DT_Name",
          LevelContinue: true,
          Level_Index: 1,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 3,
      Level_Name: "Power House",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 3,
          Level_Sno: 1,
          Level_Table: "PH_DATA",
          Level_TabName: "power_house_details",
          Level_Primary_Key: "PH_Id",
          Item_Name: "Power House",
          Item_Count: 0,
          ItemKey: "PH_Id",
          defaultNameField: "PH_Name",
          LevelContinue: true,
          Level_Index: 2,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 4,
      Level_Name: "MV Panel",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 4,
          Level_Sno: 1,
          Level_Table: "MV_DATA",
          Level_TabName: "mv_panel_details",
          Level_Primary_Key: "MV_Panel_Id",
          Item_Name: "MV Panel",
          Item_Count: 0,
          ItemKey: "MV_Panel_Id",
          defaultNameField: "MV_Panel_Name",
          LevelContinue: true,
          Level_Index: 3,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 5,
      Level_Name: "Capacitor / Department Feeder",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 5,
          Level_Sno: 1,
          Level_Table: "CAP_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Cap_id",
          Item_Name: "Capacitor",
          Item_Count: 0,
          ItemKey: "Cap_id",
          defaultNameField: "Cap_Name",
          LevelContinue: false,
          Level_Index: 4,
          skipColumns: ["Feeder_id"],
        },
        {
          Flow_No: 1,
          Level_No: 5,
          Level_Sno: 2,
          Level_Table: "FEEDER_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Feeder_id",
          Item_Name: "Department Feeder",
          Item_Count: 0,
          ItemKey: "Feeder_id",
          defaultNameField: "Feeder_Name",
          LevelContinue: true,
          Level_Index: 4,
          skipColumns: [],
        },
      ],
    },
    {
      Flow_No: 1,
      Level_No: 6,
      Level_Name: "Distribution Board / Capacitor",
      Level_Data: [
        {
          Flow_No: 1,
          Level_No: 6,
          Level_Sno: 1,
          Level_Table: "DB_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Board_Id",
          Item_Name: "Distribution Board",
          Item_Count: 0,
          ItemKey: "Board_Id",
          defaultNameField: "DB_Name",
          LevelContinue: false,
          Level_Index: 5,
          skipColumns: [],
        },
        {
          Flow_No: 1,
          Level_No: 6,
          Level_Sno: 2,
          Level_Table: "CAP_DATA",
          Level_TabName: null,
          Level_Primary_Key: "Cap_id",
          Item_Name: "Capacitor",
          Item_Count: 0,
          ItemKey: "Cap_id",
          defaultNameField: "Cap_Name",
          LevelContinue: false,
          Level_Index: 5,
          skipColumns: ["MV_Panel_Id"],
        },
      ],
    },
  ];
}
