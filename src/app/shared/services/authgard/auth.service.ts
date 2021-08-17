import { Router } from '@angular/router';
import { AuthentificationApiUrls } from '../../api/AuthentificationUrls';
import { UserAccessModel, UserLoginModel } from '../../models/Login.models';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IndexedDBService } from '../indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authentificationApiUrls: AuthentificationApiUrls,
    private http: HttpClient, private indexedDbService: IndexedDBService,
    private router: Router) { }

  public login(user: UserLoginModel) {
    return this.http
      .post<UserAccessModel>(this.authentificationApiUrls.loginAsyncUrl, user)
      .pipe(
        map((result) => {
          localStorage.setItem("AdministrationLoggedIn", "true");
          return result;
        })
      );
  }


  public logout() {
    localStorage.setItem("AdministrationLoggedIn", "false");
    this.indexedDbService.removeAllData();
    this.router.navigate(["/login"]);
  }

  async getTokenJwt() {
    const response = await this.indexedDbService.get("userTokenValue");
    return new HttpHeaders().set("Authorization", `Bearer ${response.value}`);
  }
}
