import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://localhost:8080/api';

  constructor(private _http: Http) {

  }

  agenda(agendamento) {
    return this._http.post(this._url + "/agendamento/agenda", agendamento);
  }

}
