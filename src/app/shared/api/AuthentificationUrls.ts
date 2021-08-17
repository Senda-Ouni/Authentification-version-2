import { Injectable } from '@angular/core';

@Injectable()
export class AuthentificationApiUrls {
  public loginAsyncUrl = "https://api-stb.prod.addinn.com/NotifyAuth";
  public getAllAlbumAsyncUrl = "https://jsonplaceholder.typicode.com/photos";

  constructor() {}
}
