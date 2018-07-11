import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";
import { HttpClientModule } from '@angular/common/http';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [PhotoComponent, PhotoListComponent],
    imports: [HttpClientModule, CommonModule]
})
export class PhotosModule { }