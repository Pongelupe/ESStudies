import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { Photo } from './photo';

const API : string = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    constructor(private _http: HttpClient) { }

    listFromUser(username: string): Observable<Photo[]> {
        return this._http.get<Photo[]>(`${API}/${username}/photos`);
    }
}