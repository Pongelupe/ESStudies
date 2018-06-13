import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class FotoService {

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastra(foto: FotoComponent): Observable<Response> {
        return this.http.post('v1/fotos', JSON.stringify(foto), { headers: this.headers });

    }

    lista(): Observable<FotoComponent[]> {
        return this.http.get('v1/fotos')
            .map(res => res.json());
    }

    remove(foto: FotoComponent): Observable<Response> {
        return this.http.delete(`v1/fotos/${foto._id}`);
    }
}