import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/Carro';
import { Acessorio } from '../../models/Acessorio';
import { CadastroPage } from '../cadastro/cadastro';


@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios = [];
  public _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: 'Freio ABS', preco: 800 },
      { nome: 'Ar-condicionado', preco: 1000 },
      { nome: 'MP3 Player', preco: 500 }
    ];
  }

  get precoTotal() { return this._precoTotal }

  avancarCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carro: this.carro,
      precoTotal: this._precoTotal
    });
  }

  atualizaTotal(ativado: boolean, acessorio: Acessorio) {
    ativado ?
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }

}
