import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PhotoService } from "../photo/photo.service";
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private _service: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const username = route.params.userName;

        return this._service.listFromUserPaginated(username, 1);
    }

}