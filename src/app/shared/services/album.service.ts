import { HttpClient } from '@angular/common/http';
 import { AuthentificationApiUrls } from './../api/AuthentificationUrls';
import { Injectable } from '@angular/core';
import { AuthService } from './authgard/auth.service';
import { AlbumModel } from '../models/items.models';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private authentificationUrls: AuthentificationApiUrls,
    private authService: AuthService, private http: HttpClient) {

  }

  async getAll() {
    // const jwtHeaders = await this.authService.getTokenJwt();
    const data = this.http.get<AlbumModel[]>(
      this.authentificationUrls.getAllAlbumAsyncUrl,
      // { headers: jwtHeaders }
    );
    return data.toPromise();
  }
}
