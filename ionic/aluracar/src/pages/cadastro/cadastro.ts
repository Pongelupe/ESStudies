import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/Carro';

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
  public data : string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  }

}
