import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {
  NbComponentStatus,
  NbDatepickerModule,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { AuditModel, DeleteAudit, SelectAudit } from "../../Model/AuditModel";
import { ListOfInput, GetMillInput } from "../../Model/AuditModel";
import { AuditapiService } from "../../Service/API/Audit.Service";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: "ngx-audit-management",
  templateUrl: "./audit-management.component.html",
  styleUrls: ["./audit-management.component.scss"],
  providers: [{ provide: NbDatepickerModule, useValue: MY_DATE_FORMATS }],
})
// export class AuditManagementComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class AuditManagementComponent implements OnInit {
  ListOfInput = new ListOfInput();
  CustomerID = 1;
  index = 1;
  destroyByClick = true;
  statusCards: any;
  alive: any;
  statusCardsByThemes: any;
  registerForm!: FormGroup;
  Id: number = 0;
  submitted: boolean = false;
  CreateAudit: AuditModel = new AuditModel();
  DeleteAudit: DeleteAudit = new DeleteAudit();
  isShown: boolean = false;
  IsShownTable: boolean = true;
  IsShownAddButton: boolean = true;
  Get_MillInput: GetMillInput = new GetMillInput();
  AuditList: any = [];
  selectMill: SelectAudit = new SelectAudit();
  pipe = new DatePipe("en-US");
  Btn_Name: string = "";
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Unit_Name: {
        title: "Unit Name",
        type: "number",
      },
      city: {
        title: "City",
        type: "string",
      },
      state: {
        title: "State",
        type: "string",
      },

      Contact_No: {
        title: "Contact No",
        type: "string",
      },
      Email_Id: {
        title: "EmailId",
        type: "string",
      },
    },
  };
  ActiveData: any = {};
  // viewOption

  viewOption: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private AuditApi: AuditapiService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    // alert(1);

    this.registerForm = this.formBuilder.group({
      AuditName: ["", [Validators.required, this.noWhitespaceValidator]], //Country: [undefined, [Validators.required]]   Validators.pattern("^(?!\s)([a-zA-Z0-9\s])*?(?<!\s)$")
      FromDate: [
        "",
        [
          Validators.required,
          this.noWhitespaceValidator,
          this.dateRangeValidator,
        ],
      ],
      ToDate: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          this.noWhitespaceValidator,
        ],
      ],
    });

    this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
      ////debugger;
      console.log(data);
      this.AuditList = data;
      console.log(this.AuditList);
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value != "") {
      const isWhitespace = (control.value || "").trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { AuditName: false };
    } else {
      return true;
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  Save() {
    ////debugger;
    this.submitted = true;
    //this.chkGender();

    if (this.registerForm.invalid) {
      return;
    } else {
      if (this.registerForm.value.FromDate <= this.registerForm.value.ToDate) {
        ////debugger;
        this.CreateAudit.id = "1";
        this.CreateAudit.custid = "1000054";
        this.CreateAudit.Audit_Name = this.registerForm.value.AuditName;
        this.CreateAudit.From_Date = this.registerForm.value.FromDate;
        this.CreateAudit.To_Date = this.registerForm.value.ToDate;

        if (this.Btn_Name == "Save") {
          this.AuditApi.AddAudit(this.CreateAudit).subscribe((data) => {
            if (data == true) {
              //alert("Mill Created successfully!");
              this.showToast(
                "success",
                "Unit Management",
                "Unit Created successfully!!"
              );
              this.isShown = false;
              this.IsShownAddButton = true;
              this.IsShownTable = true;
              this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
                ////debugger;
                console.log(data);
                this.AuditList = data;
                console.log(this.AuditList);
              });
            }
          });
        } else if (this.Btn_Name == "Update") {
          this.CreateAudit.id = this.registerForm.value.CustId;
          this.CreateAudit.custid = this.registerForm.value.id;
          this.AuditApi.UpdateAudit(this.CreateAudit).subscribe((data) => {
            if (data == true) {
              this.showToast(
                "success",
                "Unit Management",
                "Unit details updated successfully!!"
              );
              //alert("Mill details Updated successfully!");
              this.isShown = false;
              this.IsShownAddButton = true;
              this.IsShownTable = true;
              this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
                ////debugger;
                console.log(data);
                this.AuditList = data;
                console.log(this.AuditList);
              });
            }
          });
        }
      } else {
        this.showToast(
          "warning",
          "Audit Management",
          "End date must be greater then start date"
        );
      }
    }
  }
  // ng model validation

  doValidation(daata: number) {
    let data = this.ListOfInput.data[daata];
    console.log("data", data);
    if (data.value == "") {
      data.error = true;
    } else {
      data.error = false;
    }
  }
  onSubmit() {
    let lengthcheck = {};
    this.ListOfInput.data.forEach((data) => {
      if (data.value == "") {
        data.error = true;
      } else {
        let name = data.name;
        // this.CreateUnit[name] = data.value;
        lengthcheck[name] = data.value;
      }
    });

    let objectLength = Object.keys(lengthcheck).length;
    console.log(
      "senddate",
      // this.CreateUnit,
      objectLength,
      this.ListOfInput.data.length
    );

    if (this.ListOfInput.data.length == objectLength) {
      // this.CreateUnit.id = "1"; //this.registerForm.value.id
      // this.CreateUnit.custid = "10052"; // this.registerForm.value.CustId

      if (this.Btn_Name == "Save") {
        // console.log("create user", this.CreateUnit);
        this.AuditApi.AddAudit(lengthcheck).subscribe((data) => {
          console.log("shadgasj>>>>", data);
          if (data == true) {
            this.showToast(
              "success",
              "Unit Management",
              "Unit Created successfully!!"
            );
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
              ////debugger;
              console.log(data);
              this.AuditList = data;
              console.log(this.AuditList);
            });
          }
        });
      } else if (this.Btn_Name == "Update") {
        lengthcheck["audit_id"] = this.ActiveData.audit_id;
        lengthcheck["id"] = localStorage.getItem("userId");
        // let auditname = lengthcheck["Audit_Name"];
        console.log("auditname");
        // lengthcheck["custid"] = this.registerForm.value.id;
        this.AuditApi.UpdateAudit(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "Unit Management",
              "Unit details updated successfully!!"
            );
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
              ////debugger;
              console.log(data);
              this.AuditList = data;
              console.log(this.AuditList);
            });
          }
        });
      }
    }
  }
  Reset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  OpenAddMillPopup() {
    this.resetField();
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.submitted = false;
    this.registerForm.reset();
    this.Btn_Name = "Save";
  }
  Back() {
    this.isShown = false;
    this.IsShownAddButton = true;
    this.viewOption = false;
    this.IsShownTable = true;
  }
  Edit(ID: any) {
    this.resetField();
    // this.selectMill.custid = ID;
    let data = this.AuditList[ID];
    this.ActiveData = data;
    console.log("ID", data);
    this.ListOfInput.data.map((item) => {
      item["error"] = false;
      let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      console.log("data[0][item.name]===>", data[item.name]);
      // if () {

      // }
      if (data[item.name]) {
        return (item["value"] = data[item.name]);
      } else if (data[type]) {
        return (item["value"] = data[type]);
      } else {
        return item;
      }
    });
    console.log(" this.ListOfInput.data", this.ListOfInput.data);
    // show popup credential
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.Btn_Name = "Update";
  }
  resetField() {
    this.ListOfInput.data.map((item) => {
      return (item["value"] = ""), (item["error"] = false);
    });
  }
  view(ID: any) {
    this.resetField();
    // this.selectMill.custid = ID;
    let data = this.AuditList[ID];
    this.viewOption = true;
    this.ActiveData = data;
    console.log("ID", data);
    this.ListOfInput.data.map((item) => {
      item["error"] = false;
      let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      console.log("data[0][item.name]===>", data[item.name]);
      // if () {

      // }
      if (data[item.name]) {
        return (item["value"] = data[item.name]);
      } else if (data[type]) {
        return (item["value"] = data[type]);
      } else {
        return item;
      }
    });
    console.log(" this.ListOfInput.data", this.ListOfInput.data);
    // show popup credential
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.Btn_Name = "Update";
  }

  onDeleteConfirm(ID: string, CustId: string) {
    ////debugger;
    // this.DeleteAudit.custid = ID;
    // this.DeleteAudit.id = CustId;
    let data = {
      id: localStorage.getItem("userId"),
      custid: CustId,
      audit_id: ID,
    };
    console.log("data", data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.AuditApi.DeleteAudit(data).subscribe((data) => {
        if (data == true) {
          //alert("Mill Deleted successfully!");
          this.showToast(
            "success",
            "Audit Management",
            "Audit details deleted successfully!!"
          );
          this.isShown = false;
          this.IsShownAddButton = true;
          this.IsShownTable = true;
          this.AuditApi.AuditList(this.Get_MillInput).subscribe((data) => {
            ////debugger;
            console.log(data);
            this.AuditList = data;
            console.log(this.AuditList);
          });
        }
      });
    } else {
      //event.confirm.reject();
    }
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(
      body,
      // `Toast ${this.index}${titleContent}`,
      `${title}`,
      config
    );
  }
  ck_alert() {
    this.showToast("success", "Unit Management", "Saved");
  }
  EndDateValidation() {
    if (this.registerForm.value.FromDate >= this.registerForm.value.ToDate) {
      this.showToast(
        "warning",
        "Audit Management",
        "End date must be greater then start date"
      );
    }
  }
  StartDateValidation() {
    if (this.registerForm.value.FromDate >= this.registerForm.value.ToDate) {
      this.showToast(
        "warning",
        "Audit Management",
        "End date must be greater then start date"
      );
    }
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    ////debugger;
    let invalid = false;
    const from = this.registerForm && this.registerForm.get("FromDate").value;
    const to = this.registerForm && this.registerForm.get("ToDate").value;
    if (from && to) {
      invalid = new Date(from).valueOf() < new Date(to).valueOf();
      alert(invalid);
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };
}
