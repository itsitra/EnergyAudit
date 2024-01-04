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
  FlowtList(Get_MillInput: any): Observable<any> {
    // debugger;
    let xx = `${environment.apiurl}/web_app_select_unit`;
    return this.http.post(
      `${environment.apiurl}/web_app_master_flow_data`,
      Get_MillInput,
      { headers: this.getheaders() }
    );
  }

  GetDynamicFields(data): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/get_master_field_description`,
      data,
      { headers: this.getheaders() }
    );
  }
}
