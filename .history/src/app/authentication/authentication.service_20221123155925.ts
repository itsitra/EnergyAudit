import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  getToken(
    doRemember: any,
    name: string,
    id: string,
    status: string,
    Category: string
  ) {
    localStorage.setItem("doRemember", doRemember);
    localStorage.setItem("username", name);
    localStorage.setItem("Remembername", name);
    localStorage.setItem("userId", id);
    localStorage.setItem("status", status);
    localStorage.setItem("Category", "Super_admin");
  }
  removeToken() {
    localStorage.removeItem("status");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("AuditId");
    localStorage.removeItem("MillId");
    localStorage.removeItem("CustId");
    localStorage.removeItem("ObservableId");
    localStorage.removeItem("QuestionaireId");
    localStorage.removeItem("IntermediateId");
  }

  isLoggedin() {
    // console.log('my token ', localStorage.getItem('accessToken'));
    let userId = localStorage.getItem("userId");
    let accessToken = localStorage.getItem("status");
    console.log("the users id: ", userId);
    console.log("the users token: ", accessToken);
    return userId && accessToken;
    // if (accessToken && userId) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  logOut() {
    this.removeToken();
  }
}
