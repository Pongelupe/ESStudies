import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { Photo } from './photo';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    constructor(private _http: HttpClient) { }

    listFromUser(username: string): Observable<Photo[]> {
        return this._http.get<Photo[]>('http://localhost:3000/flavio/photos');
    }
}