import { Http, Headers } from '@angular/http';
import { FotoComponent } from './foto.component';
class FotoService {
    private headers: Headers;
    private url: 'v1/fotos';

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastra(foto: FotoComponent) {
        return this.http.post(this.url, JSON.stringify(foto), { headers: this.headers });

    }

    lista() {
        return this.http.get(this.url)
            .map(res => res.json());
    }
}