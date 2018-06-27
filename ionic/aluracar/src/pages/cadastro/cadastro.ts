import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/Carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  carro: Carro;
  precoTotal: number;

  public nome: string
  public endereco: string
  public email: string
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  }

  agenda() {
    let agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    }
    this._agendamentosService.agenda(agendamento)
      .subscribe(() => alert('Agendado'),
        err => alert("Deu problema"));
  }

}
