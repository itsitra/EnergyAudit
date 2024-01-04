import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  DeleteUser,
  GetMillInput,
  SelectUser,
  UserModel,
} from "../../Model/UserModel";

@Injectable({
  providedIn: "root",
})
export class UserapiService {
  token: string = "";
  constructor(private http: HttpClient) {}

  getheaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
  public getToken(): string {
    var val =
      localStorage.getItem("token") == null
        ? ""
        : localStorage.getItem("token");
    this.token = val == null ? "" : val;
    return this.token;
  }

  userList(): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_User`;
    return this.http.post(`${environment.apiurl}/web_app_select_User`, {
      headers: this.getheaders(),
    });
  }

  AddUser(UserModel): Observable<any> {
    //alert(11);
    // debugger;
    // console.log(UserModel);
    let userData = JSON.stringify(UserModel);
    return this.http.post(`${environment.apiurl}/web_app_add_User`, userData, {
      headers: this.getheaders(),
    });
  }
  UpdateUser(UserModel): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/web_app_update_User`,
      UserModel,
      { headers: this.getheaders() }
    );
  }
  SelectUser(selectUser: SelectUser): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_select_specific_User`,
      selectUser,
      { headers: this.getheaders() }
    );
  }
  DeleteUser(UserModel: DeleteUser): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/web_app_delete_User`,
      UserModel,
      { headers: this.getheaders() }
    );
  }
  // DeactiveVendor(Deletevendor:Delete_vendor):Observable<any>{
  //   debugger;
  //   return this.http.post(`${environment.apiurl}/api/Vendor/ChangeVendorState`,Deletevendor,{headers:this.getheaders()})

  // }
}
