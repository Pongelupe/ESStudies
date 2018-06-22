import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/Carro';


@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }

}
