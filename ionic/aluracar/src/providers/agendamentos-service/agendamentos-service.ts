import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://localhost:8080/api';

  constructor(private _http: HttpClient) {

  }

  agenda(agendamento) {
    return this._http.post(this._url + "/agendamento/agenda", agendamento);
  }

}
