import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../models/Carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../models/Agendamento';

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
  private _alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider, private _alertCtrl: AlertController) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  }

  agenda() {
    if (this.nome || this.endereco || this.email) {
      this._alertCtrl.create({
        title: "Preenchimento Obrigatório", subTitle: "Preencha todos os campos"
        , buttons: [{ text: 'ok' }]
      }).present();
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    }

    this._alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'ok',
          handler: () => { this.navCtrl.setRoot(HomePage) }
        }
      ]
    });

    let mensagem = "";

    this._agendamentosService.agenda(agendamento)
      .finally(() => {
        this._alert.setSubTitle(mensagem);
        this._alert.present();
      })
      .subscribe(() => {
        mensagem = 'Agendamento realizado';
      },
        () => {
          mensagem = 'Falha no agendamento';
        });
  }

}
