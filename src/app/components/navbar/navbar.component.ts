import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/authgard/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
public logout() {
this.authService.logout();
}
}
