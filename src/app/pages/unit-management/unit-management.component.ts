import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { GetMillInput, SelectMill } from "../../Model/MillModel";
import { DeleteUnit, UnitModel, ListOfInput } from "../../Model/UnitModel";
import { UnitapiService } from "../../Service/API/Unit.Service";

@Component({
  selector: "ngx-unit-management",
  templateUrl: "./unit-management.component.html",
  styleUrls: ["./unit-management.component.scss"],
})
// export class UnitManagementComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class UnitManagementComponent implements OnInit {
  CustomerID = 1;
  index = 1;
  ListOfInput = new ListOfInput();

  destroyByClick = true;
  statusCards: any;
  alive: any;
  statusCardsByThemes: any;
  registerForm!: FormGroup;
  Id: number = 0;
  submitted: boolean = false;
  CreateUnit: UnitModel = new UnitModel();
  DeleteUnit: DeleteUnit = new DeleteUnit();
  isShown: boolean = false;
  IsShownTable: boolean = true;
  IsShownAddButton: boolean = true;
  Get_MillInput: GetMillInput = new GetMillInput();
  UnitList: any = [];
  selectMill: SelectMill = new SelectMill();
  Btn_Name: string = "";

  // ng model field
  millName: string = "";
  address: string = "";
  city: string = "";
  state: string = "";
  pincode: string = "";
  email: string = "";
  number: string = "";
  altnumber: string = "";
  personName: string = "";
  designation: string = "";

  // error
  millNameError: boolean = false;
  addressError: boolean = false;
  cityError: boolean = false;
  stateError: boolean = false;
  pincodeError: boolean = false;
  emailError: boolean = false;
  numberError: boolean = false;
  altnumberError: boolean = false;
  personNameError: boolean = false;
  designationError: boolean = false;

  currentRowID: string = "";
  currentCustID: string = "";
  custId: string = "";
  ActiveData: any = {};

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

  // current user id
  currentUser_id: string = "";
  currentUser_role: string = "Super_admin";

  // view option
  viewOption: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private UnitApi: UnitapiService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser_role = localStorage.getItem("Category");

    // alert(1);

    this.registerForm = this.formBuilder.group({
      // id: ['', [Validators.nullValidator,this.noWhitespaceValidator]],//Country: [undefined, [Validators.required]]   Validators.pattern("^(?!\s)([a-zA-Z0-9\s])*?(?<!\s)$")
      // CustId: ['', [Validators.required,this.noWhitespaceValidator]],
      MillName: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          this.noWhitespaceValidator,
        ],
      ],
      Address: ["", [Validators.required, this.noWhitespaceValidator]],
      City: ["", [Validators.required]], //,Validators.pattern("^(?!\s)([a-zA-Z0-9\s])*?(?<!\s)$")
      State: ["", [Validators.required]], //,Validators.pattern("^(?!\s)([a-zA-Z0-9\s])*?(?<!\s)$")]],
      Pincode: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      EmailID: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      ContactNo: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ],
      ],
      AlternateNo: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ],
      ],
      ContactPerson: ["", [Validators.required, this.noWhitespaceValidator]],
      Designation: ["", [Validators.required, this.noWhitespaceValidator]],
    });

    // debugger;

    this.UnitApi.UnitList().subscribe((data) => {
      // debugger;
      console.log("list data in unit", data);
      this.UnitList = data;
      console.log(this.UnitList);
    });
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
  resetField() {
    this.ListOfInput.data.map((item) => {
      return (item["value"] = ""), (item["error"] = false);
    });
  }
  onSubmit() {
    let lengthcheck = {};
    this.ListOfInput.data.forEach((data) => {
      if (data.value == "") {
        data.error = true;
      } else {
        let name = data.name;
        this.CreateUnit[name] = data.value;
        lengthcheck[name] = data.value;
      }
    });

    let objectLength = Object.keys(lengthcheck).length;
    console.log(
      "senddate",
      this.CreateUnit,
      objectLength,
      this.ListOfInput.data.length
    );

    if (this.ListOfInput.data.length == objectLength) {
      this.CreateUnit.id = this.ActiveData.audit_id; //this.registerForm.value.id
      // this.CreateUnit.custid = "10052"; // this.registerForm.value.CustId

      if (this.Btn_Name == "Save") {
        // console.log("create user", this.CreateUnit);
        lengthcheck["id"] = localStorage.getItem("userId");
        this.UnitApi.AddUnit(lengthcheck).subscribe((data) => {
          console.log("shadgasj>>>>", data);
          if (data == true) {
            this.showToast(
              "success",
              "Unit Management",
              "Unit Created successfully!!"
            );
            this.isShown = false;
            this.resetField();
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.UnitApi.UnitList().subscribe((data) => {
              console.log(data);
              this.UnitList = data;
              console.log(this.UnitList);
            });
          }
        });
      } else if (this.Btn_Name == "Update") {
        // this.CreateUnit.id = this.registerForm.value.CustId;
        // this.CreateUnit.custid = this.registerForm.value.id;
        lengthcheck["Unit_Id"] = this.ActiveData.Unit_Id;
        //  delete lengthcheck["id"];
        this.UnitApi.UpdateUnit(lengthcheck).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "Unit Management",
              "Unit details updated successfully!!"
            );
            this.isShown = false;
            this.resetField();
            this.IsShownAddButton = true;
            this.IsShownTable = true;
            this.UnitApi.UnitList().subscribe((data) => {
              console.log(data);
              this.UnitList = data;
              console.log(this.UnitList);
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
  Edit(ID: any) {
    this.resetField();
    let data = this.UnitList[ID];
    console.log("data", data);
    this.ActiveData = data;
    // this.currentCustID = data[0].Created_By;
    // this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
    //   console.log("data >>>>>>>>>>>>", data);
    //   (this.currentRowID = data[0].Mill_id),
    //     (this.custId = data[0].Created_By),
    this.ListOfInput.data.map((item) => {
      item["error"] = false;
      let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      // console.log("data[0][item.name]===>", data[item.name]);
      // console.log("data[0][item.name]===>", item);
      // console.log("data[0][item.name]===>", data);
      if (item.name == "custid") {
        console.log("mill");
        let name = "Mill_id";
        if (data[name]) {
          return (item["value"] = data[name]);
        } else if (data[name]) {
          return (item["value"] = data[type]);
        } else {
          return item;
        }
      } else {
        console.log("Not mill");
        if (data[item.name]) {
          return (item["value"] = data[item.name]);
        } else if (data[type]) {
          return (item["value"] = data[type]);
        } else {
          return item;
        }
      }
    });
    console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
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
  view(ID: any) {
    this.resetField();
    let data = this.UnitList[ID];
    this.ActiveData = data;
    this.viewOption = true;
    // this.currentCustID = data[0].Created_By;
    // this.MillApi.SelectMill(this.selectMill).subscribe((data) => {
    //   console.log("data >>>>>>>>>>>>", data);
    //   (this.currentRowID = data[0].Mill_id),
    //     (this.custId = data[0].Created_By),
    this.ListOfInput.data.map((item) => {
      item["error"] = false;
      let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      // console.log("data[0][item.name]===>", data[item.name]);
      // console.log("data[0][item.name]===>", item);
      // console.log("data[0][item.name]===>", data);
      if (item.name == "custid") {
        console.log("mill");
        let name = "Mill_id";
        if (data[name]) {
          return (item["value"] = data[name]);
        } else if (data[name]) {
          return (item["value"] = data[type]);
        } else {
          return item;
        }
      } else {
        console.log("Not mill");
        if (data[item.name]) {
          return (item["value"] = data[item.name]);
        } else if (data[type]) {
          return (item["value"] = data[type]);
        } else {
          return item;
        }
      }
    });
    console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
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
  // Edit(ID: any, cust_id) {
  //   let data = {
  //     custid: cust_id,
  //     Unit_Id: ID,
  //   };
  //   // this.currentCustID = data[0].Created_By;
  //   this.UnitApi.SelectUnit(data).subscribe((data) => {
  //     console.log("data >>>>>>>>>>>>", data);
  //     (this.currentRowID = data[0].Mill_id),
  //       (this.custId = data[0].Created_By),
  //       this.ListOfInput.data.map((item) => {
  //         let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  //         console.log("data[0][item.name]===>", data[0][item.name]);
  //         if (data[0][item.name]) {
  //           return (item["value"] = data[0][item.name]);
  //         } else if (data[0][type]) {
  //           return (item["value"] = data[0][type]);
  //         } else {
  //           return item;
  //         }
  //       });
  //     console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
  //     //  this.changeDef.detectChanges();
  //     this.currentCustID = data[0].Created_By;
  //     // this.category = data[0].Category;
  //     // this.userName = data[0].username;
  //     // this.role = data[0].Role;
  //     // this.password = data[0].password;

  //     // show popup credential
  //     this.isShown = true;
  //     this.IsShownAddButton = false;
  //     this.IsShownTable = false;
  //     this.Btn_Name = "Update";
  //   });
  // }
  // view(ID: any) {
  //   let data = {
  //     // custid: cust_id,
  //     Unit_Id: ID,
  //   };
  //   // this.currentCustID = data[0].Created_By;
  //   this.UnitApi.SelectUnit(data).subscribe((data) => {
  //     console.log("data >>>>>>>>>>>>", data);
  //     (this.currentRowID = data[0].Mill_id),
  //       (this.custId = data[0].Created_By),
  //       this.ListOfInput.data.map((item) => {
  //         let type = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  //         console.log("data[0][item.name]===>", data[0][item.name]);
  //         if (data[0][item.name]) {
  //           return (item["value"] = data[0][item.name]);
  //         } else if (data[0][type]) {
  //           return (item["value"] = data[0][type]);
  //         } else {
  //           return item;
  //         }
  //       });
  //     console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
  //     //  this.changeDef.detectChanges();
  //     // this.currentCustID = data[0].Created_By;
  //     // this.category = data[0].Category;
  //     // this.userName = data[0].username;
  //     // this.role = data[0].Role;
  //     // this.password = data[0].password;

  //     // show popup credential
  //     this.isShown = true;
  //     this.IsShownAddButton = false;
  //     this.IsShownTable = false;
  //     this.Btn_Name = "Update";
  //   });
  // }
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
    this.resetField();
    this.isShown = false;
    this.viewOption = false;
    this.IsShownAddButton = true;
    this.IsShownTable = true;
  }
  onDeleteConfirm(ID: string, CustId: string) {
    // debugger;
    let data = {
      id: localStorage.getItem("userId"),
      Unit_Id: ID,
      custid: CustId,
    };
    if (window.confirm("Are you sure you want to delete?")) {
      this.UnitApi.DeleteUnit(data).subscribe((data) => {
        if (data == true) {
          //alert("Mill Deleted successfully!");
          this.showToast(
            "success",
            "Unit Management",
            "Unit details deleted successfully!!"
          );
          this.isShown = false;
          this.resetField();
          this.IsShownAddButton = true;
          this.IsShownTable = true;
          this.UnitApi.UnitList().subscribe((data) => {
            // debugger;
            console.log(data);
            this.UnitList = data;
            console.log(this.UnitList);
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
}
