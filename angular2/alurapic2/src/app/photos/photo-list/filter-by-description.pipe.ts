import { Pipe, PipeTransform } from "@angular/core";
import { Photo } from "../photo/photo";

@Pipe({ name: 'filterByDescription' })
export class FilterByDescription implements PipeTransform {

    transform(photos: Photo[], descriptionQuery: string) {
        if (descriptionQuery) {
            descriptionQuery = descriptionQuery.trim().toLowerCase();
            return photos.filter(photo => photo.description.toLocaleLowerCase().includes(descriptionQuery));
        } else {
            return photos;
        }
    }

}