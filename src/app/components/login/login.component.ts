import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/authgard/auth.service';
 import { UserLoginModel } from 'app/shared/models/Login.models';
import { IndexedDBService } from 'app/shared/services/indexed-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userLogin: UserLoginModel;
  public inputIsNotValid: boolean = false;
  public isLoading: boolean = false;
  public errorLogin: boolean = false;
  public errorLoginMessage: string;
  constructor(private authService: AuthService, private indexedDBService: IndexedDBService,
    private router: Router) {
    this.userLogin = new UserLoginModel();
   }

  ngOnInit(): void {
  }
  public login(regularForm: NgForm) {
    if (regularForm.valid) {
      this.inputIsNotValid = false;
      this.isLoading = true;
      // this.authService.login(this.userLogin).subscribe(res => {
        // this.indexedDBService.putUserAccessValues(this.userLogin.login, res);
        // localStorage.setItem('AdministrationLoggedIn', 'true');
        this.router.navigate(['/accueil/']);
        this.isLoading = false;
      // } ,
      //   (err: any) => {
      //     // console.log(err)
      //     this.errorLogin = true;
      //     this.errorLoginMessage = err;
      //     this.isLoading = false;
      //   })
    } else {
      this.inputIsNotValid = true;
    }
  }
}
