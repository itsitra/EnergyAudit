import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
import { id } from "@swimlane/ngx-charts";
import { removeListener } from "process";
import { GetMillInput } from "../../Model/MillModel";
import { DeleteUser, SelectUser, UserModel } from "../../Model/UserModel";
import { UserapiService } from "../../Service/API/User.Service";
import { ListOfInput, TwoWayBinding } from "../../Model/UserModel";
@Component({
  selector: "ngx-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  viewOption: boolean = false;
  index = 1;
  ListOfInput = new ListOfInput();
  TwoWayBinding = new TwoWayBinding();
  destroyByClick = true;
  // statusCards: any;
  // alive: any;
  // statusCardsByThemes: any;
  // registerForm!: FormGroup;
  Id: number = 0;
  submitted: boolean = false;
  CreateUser: UserModel = new UserModel();
  DeleteUser: DeleteUser = new DeleteUser();
  isShown: boolean = false;
  IsShownTable: boolean = true;
  IsShownAddButton: boolean = true;
  Get_MillInput: GetMillInput = new GetMillInput();
  selectUser: SelectUser = new SelectUser();
  Btn_Name: string = "";
  currentRowID: string = "";
  userList: any = [];
  // current user id
  currentUser_id: string = "";

  // ng model
  category: string = "";
  role: string = "";
  password: string = "";
  userName: string = "";

  // ng error
  categoryError: boolean = false;
  roleError: boolean = false;
  passwordError: boolean = false;
  userNameError: boolean = false;
  // validation
  categoryval: boolean = false;
  roleval: boolean = false;
  passwordval: boolean = false;
  userNameval: boolean = false;
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
      username: {
        title: "User Name",
        type: "number",
      },
      password: {
        title: "Passsword",
        type: "string",
      },
      Role: {
        title: "Role",
        type: "string",
      },
      Category: {
        title: "Category",
        type: "string",
      },
    },
  };

  constructor(
    private UserApi: UserapiService,
    private toastrService: NbToastrService,
    private changeDef: ChangeDetectorRef // private TwoWayBinding: TwoWayBinding
  ) {}

  ngOnInit(): void {
    this.currentUser_id = localStorage.getItem("userId");
    console.log(" this.currentUser_id", this.currentUser_id);
    this.UserApi.userList().subscribe((data) => {
      console.log("all user list", data);
      this.userList = data;
      this.viewOption = false;
    });
  }
  Reset() {
    this.submitted = false;
    // this.registerForm.reset();
  }
  // popup open
  OpenAddUserPopup() {
    this.ListOfInput.data.forEach((element) => {
      element.value = "";
      element["error"] = false;
      if (element.disabled == true && element.value == "") {
        element.disabled = false;
      }
    });
    this.isShown = true;
    this.IsShownAddButton = false;
    this.IsShownTable = false;
    this.submitted = false;
    this.Btn_Name = "Save";
    this.category = "";
    this.role = "";
    this.password = "";
    this.userName = "";
  }

  // popup to table
  Back() {
    this.viewOption = false; // view option disabled
    this.isShown = false;
    this.IsShownAddButton = true;
    this.IsShownTable = true;
  }

  //popup data insert
  Edit(ID: any) {
    this.selectUser.id = ID;
    this.IsShownTable = true;
    this.UserApi.SelectUser(this.selectUser).subscribe(async (data) => {
      this.ListOfInput.data.map((item) => {
        item.value = "";
        item["error"] = false;
        console.log("data[0][item.name]===>", data[0][item.name]);
        if (data[0][item.name]) {
          item["value"] = data[0][item.name];
          console.log("data for disabled", item);
          if (item.disabled == false && item.value !== "") {
            item.disabled = true;
          }
        } else {
          return item;
        }
      });
      console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
      this.changeDef.detectChanges();
      this.currentRowID = data[0].id;
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
  // view function

  view(ID: any) {
    this.selectUser.id = ID;
    this.viewOption = true;
    this.IsShownTable = true;
    this.UserApi.SelectUser(this.selectUser).subscribe(async (data) => {
      this.ListOfInput.data.map((item) => {
        item.value = "";
        item["error"] = false;
        console.log("data[0][item.name]===>", data[0][item.name]);
        if (data[0][item.name]) {
          item["value"] = data[0][item.name];
          console.log("data for disabled", item);
          if (item.disabled == false && item.value !== "") {
            item.disabled = true;
          }
        } else {
          return item;
        }
      });
      console.log("this.ListOfInput.data finall ====>", this.ListOfInput.data);
      this.changeDef.detectChanges();
      this.currentRowID = data[0].id;
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
  // doValidation

  doValidation(daata: number) {
    let data = this.ListOfInput.data[daata];
    console.log("data", data);
    if (data.value == "") {
      data.error = true;
    } else {
      data.error = false;
    }
  }

  // inactive user
  onDeleteConfirm(ID: string) {
    this.DeleteUser.id = ID;
    if (window.confirm("Are you sure you want to delete?")) {
      this.UserApi.DeleteUser(this.DeleteUser).subscribe((data) => {
        if (data == true) {
          //alert("Mill Deleted successfully!");
          this.showToast(
            "success",
            "User Management",
            "User details deleted successfully!!"
          );
          this.isShown = false;
          this.IsShownAddButton = true;
          this.IsShownTable = true;
          this.UserApi.userList().subscribe((data) => {
            // // debugger;;;
            console.log(data);
            this.userList = data;
            console.log(this.userList);
          });
        }
      });
    } else {
    }
  }

  // toster crediential
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
  // success alert
  ck_alert() {
    this.showToast("success", "User Management", "Saved");
  }

  // onsubmit
  onSubmit() {
    let senddata = {};
    this.ListOfInput.data.forEach((data) => {
      if (data.value == "") {
        data.error = true;
      } else {
        let name = data.name;
        senddata[name] = data.value;
      }
    });
    console.log("senddate", this.CreateUser);
    delete this.CreateUser["id"];
    let objectLength = Object.keys(senddata).length;
    console.log("senddate", this.ListOfInput.data.length, objectLength);

    if (this.ListOfInput.data.length == objectLength) {
      console.log("entered vibe");
      if (this.Btn_Name == "Save") {
        senddata["id"] = this.currentUser_id;
        console.log("senddata", senddata);
        this.UserApi.AddUser(senddata).subscribe((data) => {
          if (data == true) {
            this.showToast(
              "success",
              "User Management",
              "User Created successfully!!"
            );
            this.UserApi.userList().subscribe((data) => {
              this.userList = data;
            });
            this.isShown = false;
            this.IsShownAddButton = true;
            this.IsShownTable = true;
          }
        });
      } else if (this.Btn_Name == "Update") {
        senddata["id"] = this.currentRowID;
        this.UserApi.UpdateUser(senddata).subscribe((data) => {
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
            this.UserApi.userList().subscribe((data) => {
              // // // debugger;;;
              console.log("All user list", data);
              this.userList = data;
              console.log(this.userList);
            });
          }
        });
      }
    }
  }
}
