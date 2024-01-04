import { Component, OnInit } from "@angular/core";
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
import {
  DeleteMill,
  GetMillInput,
  MillModel,
  SelectMill,
  ListOfInput,
} from "../../Model/MillModel";
import { MillapiService } from "../../Service/API/Mill.Service";

@Component({
  selector: "ngx-mill-management",
  templateUrl: "./mill-management.component.html",
  styleUrls: ["./mill-management.component.scss"],
})
export class MillManagementComponent implements OnInit {
  ListOfInput = new ListOfInput();
  creatMill: MillModel = new MillModel();
  custId: string = "";
  currentRowID: string = "";
  viewOption: boolean = false;

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
  Btn_Name: string = "Save";
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

  // current user id
  currentUser_id: string = "";
  currentUser_role: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private MillApi: MillapiService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    // alert(1);
    this.currentUser_id = localStorage.getItem("userId");
    this.currentUser_role = localStorage.getItem("Category");
    this.MillApi.MillList().subscribe((data) => {
      //debugger;
      console.log(data);
      this.MillList = data;
      this.viewOption = false;
      console.log(this.MillList);
    });
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

  // on submit

  onSubmit() {
    let lengthcheck = {};
    this.ListOfInput.data.forEach((data) => {
      if (data.value == "") {
        data.error = true;
      } else {
        let name = data.name;
        this.createMillList[name] = data.value;
        lengthcheck[name] = data.value;
      }
    });
    console.log(">>>>>>>>>>", this.creatMill);
    delete this.creatMill["id"];
    console.log(">>>>>>>>>><<<", this.creatMill);
    let objectLength = Object.keys(lengthcheck).length;
    // console.log(
    //   "senddate",
    //   this.creatMill,
    //   objectLength,
    //   this.ListOfInput.data.length
    // );
    if (this.ListOfInput.data.length == objectLength) {
      // console.log("entered>>>>>>>>>>>>>");
      if (this.Btn_Name == "Save") {
        console.log("over all insert dtaa", lengthcheck);
        lengthcheck["id"] = this.currentUser_id;
        this.MillApi.AddMill(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "User Management",
              "User Created successfully!!"
            );
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.MillApi.MillList().subscribe((data) => {
              //debugger;
              this.MillList = data;
              console.log(this.MillList);
            });
          }
        });
      } else if (this.Btn_Name == "Update") {
        lengthcheck["id"] = this.currentUser_id;
        lengthcheck["custid"] = this.currentRowID; //this.registerForm.value.id
        // this.CreateUser.username= this.registerForm.value.id
        this.MillApi.UpdateMill(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "User Management",
              "User details updated successfully!!"
            );
            //alert("Mill details Updated successfully!");
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.MillApi.MillList().subscribe((data) => {
              //debugger;
              this.MillList = data;
              console.log(this.MillList);
            });
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
  // Save() {
  //   this.submitted = true;
  //   //this.chkGender();

  //   if (this.registerForm.invalid) {
  //     return;
  //   } else {
  //     // //debugger;
  //     this.CreateMill.id = ""; //this.registerForm.value.id
  //     this.CreateMill.custid = "100053"; //this.registerForm.value.CustId
  //     this.CreateMill.Mill_Name = this.registerForm.value.MillName;
  //     this.CreateMill.address = this.registerForm.value.Address;
  //     this.CreateMill.city = this.registerForm.value.City;
  //     this.CreateMill.state = this.registerForm.value.State;
  //     this.CreateMill.pincode = this.registerForm.value.Pincode;
  //     this.CreateMill.Email_Id = this.registerForm.value.EmailID;
  //     this.CreateMill.Contact_No = this.registerForm.value.ContactNo;
  //     this.CreateMill.Alternate_No = this.registerForm.value.AlternateNo;
  //     this.CreateMill.Contact_Person = this.registerForm.value.ContactPerson;
  //     this.CreateMill.Designation = this.registerForm.value.Designation;
  //     if (this.Btn_Name == "Save") {
  //       this.MillApi.AddMill(this.CreateMill).subscribe((data) => {
  //         if (data == true) {
  //           //alert("Mill Created successfully!");
  //           this.showToast(
  //             "success",
  //             "Mill Management",
  //             "Mill Created successfully!!"
  //           );
  //           this.isShown = false;
  //           this.IsShownAddButton = true;
  //           this.IsShownTable = true;
  //           this.MillApi.MillList().subscribe((data) => {
  //             //debugger;
  //             console.log(data);
  //             this.MillList = data;
  //             console.log(this.MillList);
  //           });
  //         }
  //       });
  //     } else if (this.Btn_Name == "Update") {
  //       this.CreateMill.id = this.currentCustID;
  //       this.CreateMill.custid = this.currontRowID;
  //       this.MillApi.UpdateMill(this.CreateMill).subscribe((data) => {
  //         if (data == true) {
  //           this.showToast(
  //             "success",
  //             "Mill Management",
  //             "Mill details updated successfully!!"
  //           );
  //           //alert("Mill details Updated successfully!");
  //           this.isShown = false;
  //           this.IsShownAddButton = true;
  //           this.IsShownTable = true;
  //           this.MillApi.MillList().subscribe((data) => {
  //             //debugger;
  //             console.log(data);
  //             this.MillList = data;
  //             console.log(this.MillList);
  //           });
  //         }
  //       });
  //     }
  //   }
  // }
  Reset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  resetField() {
    this.ListOfInput.data.map((item) => {
      return (item["value"] = ""), (item["error"] = false);
    });
  }
  OpenAddMillPopup() {
    this.resetField();
    this.Btn_Name = "Save";
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.submitted = false;
    this.registerForm.reset();
  }
  Back() {
    this.isShown = false;
    this.IsShownAddButton = true;
    this.IsShownTable = true;
    this.viewOption = false;
  }
  Edit(ID: any) {
    this.selectMill.custid = ID;
    // this.currentCustID = data[0].Created_By;
    this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
      console.log("data >>>>>>>>>>>>", data);
      (this.currentRowID = data[0].Mill_id),
        (this.custId = data[0].Created_By),
        this.ListOfInput.data.map((item) => {
          item["error"] = false;
          let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          console.log("data[0][item.name]===>", data[0][item.name]);
          if (data[0][item.name]) {
            return (item["value"] = data[0][item.name]);
          } else if (data[0][type]) {
            return (item["value"] = data[0][type]);
          } else {
            return item;
          }
        });
      console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
      //  this.changeDef.detectChanges();
      this.currentCustID = data[0].Created_By;
      // this.category = data[0].Category;
      // this.userName = data[0].username;
      // this.role = data[0].Role;
      // this.password = data[0].password;

      // show popup credential
      this.isShown = true;
      this.IsShownAddButton = false;
      this.IsShownTable = false;
      this.Btn_Name = "Update";
    });
  }
  view(ID: any) {
    this.selectMill.custid = ID;
    this.viewOption = true;
    // this.currentCustID = data[0].Created_By;
    this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
      console.log("data >>>>>>>>>>>>", data);
      (this.currentRowID = data[0].Mill_id),
        (this.custId = data[0].Created_By),
        this.ListOfInput.data.map((item) => {
          item["error"] = false;
          let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          console.log("data[0][item.name]===>", data[0][item.name]);
          if (data[0][item.name]) {
            return (item["value"] = data[0][item.name]);
          } else if (data[0][type]) {
            return (item["value"] = data[0][type]);
          } else {
            return item;
          }
        });
      console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
      //  this.changeDef.detectChanges();
      this.currentCustID = data[0].Created_By;
      // this.category = data[0].Category;
      // this.userName = data[0].username;
      // this.role = data[0].Role;
      // this.password = data[0].password;

      // show popup credential
      this.isShown = true;
      this.IsShownAddButton = false;
      this.IsShownTable = false;
      this.Btn_Name = "Update";
    });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  onDeleteConfirm1(value: any) {}
  onDeleteConfirm(ID: string, CustId: string) {
    // //debugger;
    this.DeleteMill.custid = ID;
    this.DeleteMill.id = CustId;
    if (window.confirm("Are you sure you want to delete?")) {
      this.MillApi.DeleteMill(this.DeleteMill).subscribe((data) => {
        if (data == true) {
          //alert("Mill Deleted successfully!");
          this.showToast(
            "success",
            "Mill Management",
            "Mill details deleted successfully!!"
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
