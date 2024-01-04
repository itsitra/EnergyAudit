import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  constructor(private service: AuthenticationService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  canActivate() {
    if (!this.service.isLoggedin()) {
      this.router.navigate(["/auth"]);
      console.log("login failed");
      return false;
    }
    console.log("login successfull");

    return true;

    // return true;
  }
}
