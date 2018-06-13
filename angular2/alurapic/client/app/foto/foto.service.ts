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

    cadastra(foto: FotoComponent): Observable<MensagemCadastro> {
        if (foto._id)
            return this.http.put(`v1/fotos/${foto._id}`, JSON.stringify(foto), { headers: this.headers })
                .map(() => (new MensagemCadastro('Foto alterada com sucesso', false)));
        else
            return this.http.post('v1/fotos', JSON.stringify(foto), { headers: this.headers })
                .map(() => (new MensagemCadastro('Foto incluída com sucesso', true)));
    }

    lista(): Observable<FotoComponent[]> {
        return this.http.get('v1/fotos')
            .map(res => res.json());
    }

    remove(foto: FotoComponent): Observable<Response> {
        return this.http.delete(`v1/fotos/${foto._id}`);
    }

    buscaPorId(id: string): Observable<FotoComponent> {
        return this.http.get(`v1/fotos/${id}`)
            .map(res => res.json());
    }
}

export class MensagemCadastro {

    constructor(private _mensagem: string, private _inclusao: boolean) { }

    get mensagem(): string { return this._mensagem }
    get inclusao(): boolean { return this._inclusao }
}