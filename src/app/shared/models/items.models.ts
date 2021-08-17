export class AlbumModel {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export class PaginationConfig {
  page: number;
  pageSize: number;
  maxSize: number;

  constructor() {
      this.page = 1;
      this.pageSize = 20;
      this.maxSize = 5;
  }
}
