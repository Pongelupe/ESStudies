import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  constructor(private _photoService: PhotoService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userName: string = this._activatedRoute.snapshot.params.userName;
    this._photoService.listFromUser(userName)
      .subscribe(photos => this.photos = photos);

  }

}
