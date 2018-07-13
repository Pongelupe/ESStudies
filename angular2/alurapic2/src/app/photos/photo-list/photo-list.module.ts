import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './photo-list.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotosComponent } from './photos/photos.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from '../../shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from '../../shared/directives/darken-on-hover/darken-on-hover.module';

@NgModule({
  imports: [
    CommonModule, PhotoModule, CardModule, DarkenOnHoverModule
  ],
  declarations: [PhotoListComponent, LoadButtonComponent, PhotosComponent, FilterByDescription, SearchComponent]
})
export class PhotoListModule { }
