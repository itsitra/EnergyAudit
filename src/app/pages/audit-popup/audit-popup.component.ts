import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ViewComponent } from "../view/view/view.component";
import { AuditapiService } from "../../Service/API/Audit.Service";
import { MillapiService } from "../../Service/API/Mill.Service";
import {
  DeleteMill,
  GetMillInput,
  MillModel,
  SelectMill,
  ListOfInput,
} from "../../Model/MillModel";
import { IntermediateapiService } from "../../Service/API/intermediate.service";
import { ObservationapiService } from "../../Service/API/observation.service";
import { QuestionnaireapiService } from "../../Service/API/questionnaire.service";
import { UserapiService } from "../../Service/API/User.Service";

@Component({
  selector: "ngx-audit-popup",
  templateUrl: "./audit-popup.component.html",
  styleUrls: ["./audit-popup.component.scss"],
})
export class AuditPopupComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: AuditapiService,
    private MillApi: MillapiService,
    private AuditApi: AuditapiService,
    private ObservationapiService: ObservationapiService,
    private IntermediateapiService: IntermediateapiService,
    private QuestionnaireapiService: QuestionnaireapiService,
    private UserApi: UserapiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AuditPopupComponent>
  ) {}
  id: string = "";
  AuditValue: string = "";
  MillValue: string = "";
  IntermediateValue: string = "";
  ObservableValue: string = "";
  QuestionnaireValue: string = "";
  Customer_Id: string = "";

  // validation
  AuditValueError: boolean = false;
  MillValueError: boolean = false;
  Customer_IdError: boolean = false;
  buttondisable: boolean = true;
  // Milll details
  Get_MillInput: GetMillInput = new GetMillInput();
  MillListdata: any = [];
  IntermediateListData: any = [];
  ObservableListData: any = [];
  QuestionnaireListData: any = [];

  // key used for value set in Local or redirect
  Key: number = 0;

  // Audit
  AuditListdata: any = [];

  Audit = [
    {
      id: 1,
      name: "First Audit",
    },
    {
      id: 2,
      name: "Second Audit",
    },
    {
      id: 3,
      name: "Third Audit",
    },
  ];
  Mill = [
    {
      id: 1,
      name: "First Mill",
    },
    {
      id: 2,
      name: "Second Mill",
    },
    {
      id: 3,
      name: "Third Mill",
    },
  ];
  userList: any = [];
  ngOnInit(): void {
    console.log("data", this.data.key);
    this.Key = this.data.key;

    ////debugger;
    this.Get_MillInput.Audit_Name = "New";
    this.Get_MillInput.audit_id = "7";
    this.Get_MillInput.id = "1";
    this.Get_MillInput.Mill_Name = "Mill11111";
    this.Get_MillInput.username = "staff";
    this.Get_MillInput.password = "staff@123";
    this.Get_MillInput.Reg_id = "82";
    this.Get_MillInput.custid = "1000054";
    this.Get_MillInput.FlowNo = "1";
    this.Get_MillInput.LevelNo = "1";
    this.Get_MillInput.Level_Sno = "1";
    this.Get_MillInput.PT_Id = "8";
    this.Get_MillInput.No_of_Mcs = "44";
    this.Get_MillInput.PT_Make = "Atlas";
    this.Get_MillInput.PT_Cap_MVA_Natural = "25590";
    this.Get_MillInput.PT_Cap_MVA_Forced = "4321";
    this.Get_MillInput.PT_EHT_Voltage = "4322";
    this.Get_MillInput.PT_EHT_Current = "4323";
    this.Get_MillInput.PT_HT_Voltage = "43246";
    this.Get_MillInput.PT_HT_Current = "4325";
    this.Get_MillInput.PT_Imp_per = "4326";
    this.Get_MillInput.PT_Tap = "Off Circuit";
    this.Get_MillInput.PT_No_Tap = "1";
    this.Get_MillInput.PT_Cable_Material = "Al";
    this.Get_MillInput.PT_Cable_Size = "20";
    this.Get_MillInput.PT_LT_Cable_Material = "Sample";
    this.Get_MillInput.PT_LT_Cable_Size = "80";
    this.Get_MillInput.PT_Cooling_Type = "Forced";
    this.Get_MillInput.PT_Indoor_outdoor = "Indoor";
    this.Get_MillInput.PT_Core_Type = "EE";
    this.Get_MillInput.From_Date = " ";
    this.Get_MillInput.To_Date = " ";
    this.Get_MillInput.Unit_Name = "Unit";
    this.Get_MillInput.address = "address";
    this.Get_MillInput.city = "city";
    this.Get_MillInput.state = "state";
    this.Get_MillInput.pincode = "888888";
    this.Get_MillInput.Email_Id = "email";
    this.Get_MillInput.Contact_No = "3543534";
    this.Get_MillInput.Alternate_No = "24234234";
    this.Get_MillInput.Contact_Person = "Contact";
    this.Get_MillInput.Designation = "desig";
    this.Get_MillInput.Unit_Id = "5";
    this.MillList();
    this.AuditList();
    this.IntermediateList();
    this.ObservableList();
    this.QuestionnaireList();
    // this.UserLIst();
    let Category = localStorage.getItem("Category");
    let userId = localStorage.getItem("login_Mill_id");

    if (Category == "Customer") {
      const id = localStorage.setItem("CustId", userId);
      this.Customer_Id = userId;
    }
    let localAudit = localStorage.getItem("AuditId");
    let localMill = localStorage.getItem("MillId");
    let localCustId = localStorage.getItem("CustId");
    let localObservable = localStorage.getItem("ObservableId");
    let localQuestionaire = localStorage.getItem("QuestionaireId");
    let localIntermediate = localStorage.getItem("IntermediateId");
    if (localAudit !== null && localMill !== null) {
      this.AuditValue = localAudit;
      this.MillValue = localMill;
      this.Customer_Id = localCustId;
      this.ObservableValue = localObservable;
      this.QuestionnaireValue = localQuestionaire;
      this.IntermediateValue = localIntermediate;
    }
  }
  // UserLIst() {
  //   this.UserApi.userList().subscribe((data) => {
  //     console.log("all user list", data);
  //     this.userList = data;
  //     // this.viewOption = false;
  //   });
  // }
  MillList() {
    this.MillApi.MillList().subscribe((data) => {
      //debugger;
      console.log(">>>>>>>>>>>>>>>>>>", data);
      this.MillListdata = data;
      this.userList = data;
    });
  }
  IntermediateList() {
    this.IntermediateapiService.IntermediateList().subscribe((data) => {
      //debugger;
      console.log(">>>>>>>>>>>>>>>>>> intermediate", data);
      this.IntermediateListData = data;
    });
  }
  ObservableList() {
    this.ObservationapiService.ObservationapiList().subscribe((data) => {
      //debugger;
      console.log(">>>>>>>>>>>>>>>>>> observation list", data);
      this.ObservableListData = data;
    });
  }
  QuestionnaireList() {
    console.log("questionart");
    this.QuestionnaireapiService.QuestionnaireapiList().subscribe((data) => {
      //debugger;
      console.log(">>>>>>>>>>>>>>>>>> Questionnaire", data);
      this.QuestionnaireListData = data;
    });
  }
  AuditList() {
    this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
      ////debugger;
      console.log("Audiote >>>>", data);
      this.AuditListdata = data;
    });
  }
  onChange(data) {
    console.log(">>>>>sdfsdfsdf", data);
    // this.dialog.open(ViewComponent, {
    //   width: "34px",
    //   panelClass: "model_class",
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (typeof result != "undefined") {
    //     if (result.data.status === "saved") {
    //     }
    //   }
    // });
  }
  doValidationone() {
    if (this.AuditValue == "") {
      this.AuditValueError = true;
    } else {
      this.AuditValueError = false;
    }

    if (
      this.AuditValue == "" ||
      this.MillValue == "" ||
      this.Customer_Id == ""
    ) {
      this.buttondisable = true;
    } else {
      this.buttondisable = false;
    }
    if (this.Customer_Id == "") {
    }
  }
  doValidationtwo() {
    if (this.MillValue == "") {
      this.MillValueError = true;
    } else {
      this.MillValueError = false;
    }

    if (
      this.AuditValue == "" ||
      this.MillValue == "" ||
      this.Customer_Id == ""
    ) {
      this.buttondisable = true;
    } else {
      this.buttondisable = false;
    }
  }
  doValidationthree() {
    if (this.Customer_Id == "") {
      this.Customer_IdError = true;
    } else {
      this.Customer_IdError = false;
    }

    if (
      this.AuditValue == "" ||
      this.MillValue == "" ||
      this.Customer_Id == ""
    ) {
      this.buttondisable = true;
    } else {
      this.buttondisable = false;
    }
  }
  onSubmit() {
    this.AuditValue;
    this.MillValue;
    console.log(
      ">>>>>>><<<<<",
      this.IntermediateValue,
      this.ObservableValue,
      this.QuestionnaireValue
    );
    this.dialogRef.close({
      data: {
        status: "closed",
        Audit: this.AuditValue,
        Mill: this.MillValue,
        Customer: this.Customer_Id,
        Intermediate: this.IntermediateValue,
        Observable: this.ObservableValue,
        Questionnaire: this.QuestionnaireValue,
      },
    });
  }

  // close popup
  // close() {
  //   alert("close button ");
  //   this.dialogRef.disableClose = true;
  //   this.dialogRef.close({
  //     event: "close",
  //     data: {
  //       status: "closed",
  //     },
  //   });
  // }
}
export interface DialogData {
  key: number;
}
