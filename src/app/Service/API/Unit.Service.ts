import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UnitModel, DeleteUnit, SelectUnit } from "../../Model/UnitModel";
import { GetMillInput } from "../../Model/MillModel";

@Injectable({
  providedIn: "root",
})
export class UnitapiService {
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

  UnitList(): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_unit`;
    return this.http.post(`${environment.apiurl}/web_app_select_unit`, {
      headers: this.getheaders(),
    });
  }
  AddUnit(data): Observable<any> {
    //alert(11);
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_add_unit`, data, {
      headers: this.getheaders(),
    });
  }
  UpdateUnit(data): Observable<any> {
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_update_unit`, data, {
      headers: this.getheaders(),
    });
  }
  SelectUnit(selectUnit: SelectUnit): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_specific_unit`,
      selectUnit,
      { headers: this.getheaders() }
    );
  }
  DeleteUnit(data): Observable<any> {
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_delete_unit`, data, {
      headers: this.getheaders(),
    });
  }
  // DeactiveVendor(Deletevendor:Delete_vendor):Observable<any>{
  //   debugger;
  //   return this.http.post(`${environment.apiurl}/api/Vendor/ChangeVendorState`,Deletevendor,{headers:this.getheaders()})

  // }
}
