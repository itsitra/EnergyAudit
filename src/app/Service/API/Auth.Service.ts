import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { LoginCredentials } from "../../Model/AuthModel";

@Injectable({
  providedIn: "root",
})
export class AuthapiService {
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

  // Login(LoginCredentials: LoginCredentials): Observable<any> {
  //   console.log("hit", `${environment.apiurl}/web_app_user_authentication`);
  //   // debugger;
  //   // let xx = `${environment.apiurl}/web_app_select_unit`;
  //   let data = {
  //     mobile: "8888888888",
  //     otp: "123456",
  //   };

  //   let head = {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   };
  //   return this.http.post("http://192.168.0.57/adama/api/users/login", data, {
  //     headers: head,
  //   });
  // }
  Login(LoginCredentials: LoginCredentials): Observable<any> {
    console.log("hit", `${environment.apiurl}/web_app_user_authentication`);
    // debugger;
    // let xx = `${environment.apiurl}/web_app_select_unit`;
    return this.http.post(
      `${environment.apiurl}/web_app_user_authentication`,
      LoginCredentials,
      { headers: this.getheaders() }
    );
  }
}
