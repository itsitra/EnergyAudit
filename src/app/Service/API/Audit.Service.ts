import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuditModel, DeleteAudit, SelectAudit } from "../../Model/AuditModel";
import { GetMillInput } from "../../Model/MillModel";

@Injectable({
  providedIn: "root",
})
export class AuditapiService {
  token: string = "";
  dropDown: Array<string> = ["option 1", "option 2", "option 3"];
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

  AuditList(Get_MillInput: GetMillInput): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_unit`;
    return this.http.post(
      `${environment.apiurl}/web_app_select_audit`,
      Get_MillInput,
      { headers: this.getheaders() }
    );
  }
  AddAudit(data): Observable<any> {
    //alert(11);
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_add_audit`, data, {
      headers: this.getheaders(),
    });
  }
  UpdateAudit(data): Observable<any> {
    // debugger;
    console.log("data", data);
    return this.http.post(`${environment.apiurl}/web_app_update_audit`, data, {
      headers: this.getheaders(),
    });
  }
  SelectAudit(selectUnit: SelectAudit): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_specific_audit`,
      selectUnit,
      { headers: this.getheaders() }
    );
  }
  DeleteAudit(data): Observable<any> {
    // debugger;
    return this.http.post(`${environment.apiurl}/web_app_delete_audit`, data, {
      headers: this.getheaders(),
    });
  }
}
