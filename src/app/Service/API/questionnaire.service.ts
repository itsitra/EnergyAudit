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
export class QuestionnaireapiService {
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

  QuestionnaireapiList(): Observable<any> {
    // debugger;
    // let xx = `${environment.apiurl}/web_app_select_Mill`;
    return this.http.post(`${environment.apiurl}/select_questionnaire_screen`, {
      headers: this.getheaders(),
    });
  }
  QuestionnaireList(Model: any): Observable<any> {
    //alert(11);
    // debugger;
    console.log("sdbas", Model);
    return this.http.post(
      `${environment.apiurl}/get_questionnaire_data`,
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
      `${environment.apiurl}/get_ques_field_description`,
      scrren,
      { headers: this.getheaders() }
    );
  }
  InsertDate(selectMill: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/insert_questionnaire_data`,
      selectMill,
      { headers: this.getheaders() }
    );
  }
  UpdateDate(selectMill: any): Observable<any> {
    return this.http.post(
      `${environment.apiurl}/update_questionnaire_data`,
      selectMill,
      { headers: this.getheaders() }
    );
  }
  DeleteQuestionary(data): Observable<any> {
    // debugger;
    return this.http.post(
      `${environment.apiurl}/delete_questionnaire_data`,
      data,
      { headers: this.getheaders() }
    );
  }
  // DeactiveVendor(Deletevendor:Delete_vendor):Observable<any>{
  //   debugger;
  //   return this.http.post(`${environment.apiurl}/api/Vendor/ChangeVendorState`,Deletevendor,{headers:this.getheaders()})

  // }
}
