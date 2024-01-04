import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  MillModel,
  GetMillInput,
  DeleteMill,
  SelectMill,
} from "../../Model/MillModel";

@Injectable({
  providedIn: "root",
})
export class MillapiService {
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

  MillList(): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_Mill`;
    return this.http.post(`${environment.apiurl}/web_app_select_Mill`, {
      headers: this.getheaders(),
    });
  }
  AddMill(MillModel: any): Observable<any> {
    //alert(11);
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_add_Mill`, MillModel, {
      headers: this.getheaders(),
    });
  }
  UpdateMill(MillModel: any): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/web_app_update_Mill`,
      MillModel,
      { headers: this.getheaders() }
    );
  }
  SelectMill(selectMill: SelectMill): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_specific_Mill`,
      selectMill,
      { headers: this.getheaders() }
    );
  }
  DeleteMill(MillModel: DeleteMill): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/web_app_delete_Mill`,
      MillModel,
      { headers: this.getheaders() }
    );
  }
  // DeactiveVendor(Deletevendor:Delete_vendor):Observable<any>{
  //   debugger;
  //   return this.http.post(`${environment.apiurl}/api/Vendor/ChangeVendorState`,Deletevendor,{headers:this.getheaders()})

  // }
}
