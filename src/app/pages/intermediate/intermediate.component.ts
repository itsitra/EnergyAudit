import { Component, OnInit } from "@angular/core";
import { AuditapiService } from "../../Service/API/Audit.Service";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  DeleteMill,
  GetMillInput,
  MillModel,
  SelectMill,
  ListOfInput,
} from "../../Model/observation";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbThemeService,
  NbToastrService,
} from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { MillapiService } from "../../Service/API/Mill.Service";
import { ObservationapiService } from "../../Service/API/observation.service";
import { IntermediateapiService } from "../../Service/API/intermediate.service";

@Component({
  selector: "ngx-intermediate",
  templateUrl: "./intermediate.component.html",
  styleUrls: ["./intermediate.component.scss"],
})
export class IntermediateComponent implements OnInit {
  ListOfInput = new ListOfInput();
  // ListOfInput = new ListOfInput();
  creatMill: MillModel = new MillModel();
  custId: string = "";
  currentRowID: string = "";

  createMillList = {};
  index = 1;
  destroyByClick = true;
  statusCards: any;
  alive: any;
  statusCardsByThemes: any;
  registerForm!: FormGroup;
  Id: number = 0;
  submitted: boolean = false;
  CreateMill: MillModel = new MillModel();
  DeleteMill: DeleteMill = new DeleteMill();
  isShown: boolean = false;
  IsShownTable: boolean = true;
  IsShownAddButton: boolean = true;
  Get_MillInput: GetMillInput = new GetMillInput();
  MillList: any = [];
  selectMill: SelectMill = new SelectMill();
  Btn_Name: string = "";
  currontRowID: string = "";
  currentCustID: string = "";
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
      Mill_Name: {
        title: "Mill Name",
        type: "number",
      },
      City: {
        title: "City",
        type: "string",
      },
      State: {
        title: "State",
        type: "string",
      },
      Contact_Person: {
        title: "Contact Person",
        type: "string",
      },
      Designation: {
        title: "Designation",
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
  // Params id
  Audit_id: string = "";
  Mill_id: string = "";
  Screen_id: string = "";
  cust_id: string = "";
  // list
  IntermediateDataList: any = [];
  empList: any = [];
  // boolean
  viewOption: boolean = false;
  currentUser_role: string = "";

  constructor(
    private service: AuditapiService,
    private ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private MillApi: MillapiService,
    private toastrService: NbToastrService,
    private Observation: ObservationapiService,
    private Intermediate: IntermediateapiService
  ) {
    this.ActivatedRoute.params.subscribe((res) => {
      console.log("res", res);
      this.Audit_id = res.Audit;
      this.Mill_id = res.Mill;
      this.Screen_id = res.Screen;
      this.cust_id = res.CustId;
    });
    this.IntermediateList();
  }

  ngOnInit(): void {
    this.currentUser_role = localStorage.getItem("Category");
    this.IntermediateList();
    this.InputFieldsList();
  }
  Edit(ID: any) {
    let data = this.IntermediateDataList[ID];
    // this.currentCustID = data[0].Created_By;
    // this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
    //   console.log("data >>>>>>>>>>>>", data);
    //   (this.currentRowID = data[0].Mill_id),
    //     (this.custId = data[0].Created_By),
    this.empList.map((item) => {
      item["error"] = false;
      let type =
        item.Field_Name.charAt(0).toUpperCase() + item.Field_Name.slice(1);
      console.log("data[0][item.name]===>", data[item.Field_Name]);
      if (data[item.Field_Name]) {
        return (item["value"] = data[item.Field_Name]);
      } else if (data[type]) {
        return (item["value"] = data[type]);
      } else {
        return item;
      }
    });
    console.log("this.ListOfInput.data finall ====>", this.empList);
    //  this.changeDef.detectChanges();
    this.currentCustID = data.Created_By;
    // this.category = data[0].Category;
    // this.userName = data[0].username;
    // this.role = data[0].Role;
    // this.password = data[0].password;

    // show popup credential
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.Btn_Name = "Update";
    // }
    // );
  }
  // Field list
  InputFieldsList() {
    let data = {
      ScreenNo: this.Screen_id,
    };
    this.Intermediate.InputField(data).subscribe((data) => {
      // console.log("data>>>>>>>>", data);
      this.dynamicFieldCreator(data);

      // console.log("DataType", this.ApiData);
    });
  }

  // ng model validation
  dynamicFieldCreator(data: Array<ListOfInput>) {
    console.log("DataType beforeeeeeeeeeeeee", this.empList);

    this.empList = data;
    this.empList = this.empList.map((emp) => {
      let val = Object.assign({}, emp);
      val.errorText = `${val.Field_Name} is required`;
      val.value = "";
      val.textField = true;
      val.error = false;
      return val;
    });
    console.log("DataType after", this.empList);
  }

  IntermediateList() {
    let data = {
      custid: this.cust_id,
      ScreenNo: this.Screen_id,
    };
    this.Intermediate.IntermediateDataList(data).subscribe((data) => {
      console.log("data for intermediate", data);
      this.IntermediateDataList = data;
    });
  }
  doValidation(daata: number) {
    let data = this.empList[daata];
    console.log("data", data);
    if (data.value == "") {
      data.error = true;
    } else {
      data.error = false;
    }
  }
  // on submit

  onSubmit() {
    let lengthcheck = {};
    this.empList.forEach((data) => {
      if (data.value == "") {
        data.error = true;
      } else {
        let name = data.Field_Name;
        this.IntermediateDataList[name] = data.value;
        lengthcheck[name] = data.value;
      }
    });
    // console.log(">>>>>>>>>>", this.creatMill);
    // delete this.creatMill["id"];
    // console.log(">>>>>>>>>><<<", this.creatMill);
    let objectLength = Object.keys(lengthcheck).length;
    console.log("senddate", objectLength, this.empList.length);
    if (this.empList.length == objectLength) {
      // console.log("entered>>>>>>>>>>>>>");
      if (this.Btn_Name == "Save") {
        console.log("over all insert dtaa", lengthcheck);
        lengthcheck["custid"] = this.cust_id;
        lengthcheck["ScreenNo"] = this.Screen_id;

        this.Intermediate.InsertDate(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "Intermediate Management",
              "Intermediate Created successfully!!"
            );
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.IntermediateList();
          }
        });
      } else if (this.Btn_Name == "Update") {
        lengthcheck["custid"] = this.cust_id;
        lengthcheck["ScreenNo"] = this.Screen_id; //this.registerForm.value.id
        this.Intermediate.UpdateDate(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "Intermediate Management",
              "Intermediate details updated successfully!!"
            );
            //alert("Mill details Updated successfully!");
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.IntermediateList();
          }
        });
      }
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value != "") {
      const isWhitespace = (control.value || "").trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { ProductName: false };
    } else {
      return true;
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  Save() {
    this.submitted = true;
    //this.chkGender();

    if (this.registerForm.invalid) {
      return;
    } else {
      // //debugger;
      this.CreateMill.id = ""; //this.registerForm.value.id
      this.CreateMill.custid = "100053"; //this.registerForm.value.CustId
      this.CreateMill.Mill_Name = this.registerForm.value.MillName;
      this.CreateMill.address = this.registerForm.value.Address;
      this.CreateMill.city = this.registerForm.value.City;
      this.CreateMill.state = this.registerForm.value.State;
      this.CreateMill.pincode = this.registerForm.value.Pincode;
      this.CreateMill.Email_Id = this.registerForm.value.EmailID;
      this.CreateMill.Contact_No = this.registerForm.value.ContactNo;
      this.CreateMill.Alternate_No = this.registerForm.value.AlternateNo;
      this.CreateMill.Contact_Person = this.registerForm.value.ContactPerson;
      this.CreateMill.Designation = this.registerForm.value.Designation;
      if (this.Btn_Name == "Save") {
        this.MillApi.AddMill(this.CreateMill).subscribe((data) => {
          if (data == true) {
            //alert("Mill Created successfully!");
            this.showToast(
              "success",
              "Mill Management",
              "Mill Created successfully!!"
            );
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.MillApi.MillList().subscribe((data) => {
              //debugger;
              console.log(data);
              this.MillList = data;
              console.log(this.MillList);
            });
          }
        });
      } else if (this.Btn_Name == "Update") {
        this.CreateMill.id = this.currentCustID;
        this.CreateMill.custid = this.currontRowID;
        this.MillApi.UpdateMill(this.CreateMill).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "Mill Management",
              "Mill details updated successfully!!"
            );
            //alert("Mill details Updated successfully!");
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.MillApi.MillList().subscribe((data) => {
              //debugger;
              console.log(data);
              this.MillList = data;
              console.log(this.MillList);
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
  resetField() {
    this.empList.map((item) => {
      return (item["value"] = ""), (item["error"] = false);
    });
  }
  OpenAddIntermediatePopup() {
    this.resetField();
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.submitted = false;
    this.Btn_Name = "Save";
  }
  Back() {
    this.isShown = false;
    this.IsShownAddButton = true;
    this.viewOption = false;
    this.IsShownTable = true;
  }
  view(ID: any) {
    let data = this.IntermediateDataList[ID];
    this.viewOption = true;
    // this.currentCustID = data[0].Created_By;
    // this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
    //   console.log("data >>>>>>>>>>>>", data);
    //   (this.currentRowID = data[0].Mill_id),
    //     (this.custId = data[0].Created_By),
    this.empList.map((item) => {
      item["error"] = false;
      let type =
        item.Field_Name.charAt(0).toUpperCase() + item.Field_Name.slice(1);
      console.log("data[0][item.name]===>", data[item.Field_Name]);
      if (data[item.Field_Name]) {
        return (item["value"] = data[item.Field_Name]);
      } else if (data[type]) {
        return (item["value"] = data[type]);
      } else {
        return item;
      }
    });
    console.log("this.ListOfInput.data finall ====>", this.empList);
    //  this.changeDef.detectChanges();
    this.currentCustID = data.Created_By;
    // this.category = data[0].Category;
    // this.userName = data[0].username;
    // this.role = data[0].Role;
    // this.password = data[0].password;

    // show popup credential
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.Btn_Name = "Update";
    // }
    // );
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onDeleteConfirm(ID: string) {
    // //debugger;
    let data = {
      custid: this.cust_id,
      ScreenNo: this.Screen_id,
      Overall_Id: ID,
    };
    if (window.confirm("Are you sure you want to delete?")) {
      this.Intermediate.DeleteIntermediate(data).subscribe((data) => {
        if (data == true) {
          //alert("Mill Deleted successfully!");
          this.showToast(
            "success",
            "Intermediate Management",
            "Intermediate details deleted successfully!!"
          );
          this.isShown = false;
          this.IsShownAddButton = true;
          this.IsShownTable = true;
          this.IntermediateList();
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

    this.index = 1;
    this.toastrService.show(
      body,
      // `Toast ${this.index}${titleContent}`,
      `${title}`,
      config
    );
  }
  ck_alert() {
    this.showToast("success", "Mill Management", "Saved");
  }
}
