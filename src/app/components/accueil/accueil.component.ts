import { HttpErrorResponse } from '@angular/common/http';
import { AlbumService } from './../../shared/services/album.service';
import { AlbumModel, PaginationConfig } from '../../shared/models/items.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

 public albumListe: AlbumModel[];
 public isLoading: boolean = false;
 public errorApi: string;
 p: number = 1;
 public tableConfig = new PaginationConfig();
 images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private albumService: AlbumService) {
    this.albumListe = [];
  }

  ngOnInit() {
//     var myCarousel = document.querySelector('#myCarousel')
//     var carousel = new bootstrap.Carousel(myCarousel, {
//   interval: 2000,
//   wrap: false
// })
    this.getAllAlbum();
  }
  public getAllAlbum() {
    this.albumListe = [];
    this.isLoading = true;
    this.albumService.getAll().then(res => {
      this.albumListe = res;
      this.isLoading = false;
    },
    (err: HttpErrorResponse) => {
      this.errorApi = err.message;
      this.isLoading = false;
    })
  }
}
