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
export class ObservationapiService {
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

  ObservationapiList(): Observable<any> {
    // debugger;
    // let xx = `${environment.apiurl}/web_app_select_Mill`;
    return this.http.post(
      `${environment.apiurl}/select_observation_screen_web`,
      {
        headers: this.getheaders(),
      }
    );
  }
  ObservationDataList(Model: any): Observable<any> {
    //alert(11);
    // debugger;
    console.log("sdbas", Model);
    return this.http.post(
      `${environment.apiurl}/get_observation_data_web`,
      Model,
      {
        headers: this.getheaders(),
      }
    );
  }
  InputField(scrren: any): Observable<any> {
    // debugger;
    console.log("scrren", scrren);
    return this.http.post(
      `${environment.apiurl}/get_obs_field_description_web`,
      scrren,
      { headers: this.getheaders() }
    );
  }
  InsertDate(selectMill: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/insert_observation_data`,
      selectMill,
      { headers: this.getheaders() }
    );
  }
  UpdateDate(selectMill: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/update_observation_data_web`,
      selectMill,
      { headers: this.getheaders() }
    );
  }
  DeleteObservation(data): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/delete_observation_data_web`,
      data,
      {
        headers: this.getheaders(),
      }
    );
  }
}
