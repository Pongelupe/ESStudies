import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private _photoService: PhotoService) { }

  ngOnInit(): void {
    this._photoService.listFromUser('flavio')
      .subscribe(photos => this.photos = photos);

  }

}
