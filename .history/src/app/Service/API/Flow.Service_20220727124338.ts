import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FlowapiService {
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

  // get the flow details
  FlowtList(Get_MillInput: any): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_unit`;
    return this.http.post(
      `${environment.apiurl}/web_app_master_flow_data`,
      Get_MillInput,
      { headers: this.getheaders() }
    );
  }

  // get the dynamic form fields
  GetDynamicFields(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/get_master_field_description`,
      data,
      { headers: this.getheaders() }
    );
  }

  // get the dynamic form options list
  GetDynamicOptions(data: any): Observable<any> {
    return this.http.post(`${environment.apiurl}/web_app_master_lookup`, data, {
      headers: this.getheaders(),
    });
  }

  // add the dynamic form fields
  addFormDatas(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_add_master_data`,
      data,
      { headers: this.getheaders() }
    );
  }

  // update the dynamic form fields
  updateFormDatas(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_update_master_data`,
      data,
      { headers: this.getheaders() }
    );
  }

  // delete the dynamic form fields
  deleteFormDatas(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_delete_master_data`,
      data,
      { headers: this.getheaders() }
    );
  }

  // get individual level all datas
  getLevelDatas(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_select_all_master_data`,
      data,
      { headers: this.getheaders() }
    );
  }

  // get individual child level all datas
  getChildlevelDatas(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/web_app_select_all_nextlevel_master_data`,
      data,
      { headers: this.getheaders() }
    );
  }
}
