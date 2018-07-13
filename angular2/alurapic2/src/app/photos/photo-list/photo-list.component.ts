import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string;

  constructor(private _activatedRoute: ActivatedRoute,
    private _service: PhotoService) { }

  ngOnInit(): void {
    this.userName = this._activatedRoute.snapshot.params.userName;
    this.photos = this._activatedRoute.snapshot.data.photos;
  }


  load(): void {
    this._service.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length)
          this.hasMore = false;
      });
  }

}
