import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../models/Carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  private carros: Carro[] = [];

  constructor(public navCtrl: NavController, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _service: CarrosServiceProvider) { }

  ionViewDidLoad(): void {
    let loading = this._loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this._service.lista()
      .subscribe(carros => {
        this.carros = carros;
        loading.dismiss();
      }, (err: HttpErrorResponse) => {
        console.log(err);
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha na conexão',
          subTitle: 'Não foi possível carregar a lista de carros',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      })
  }

  selecionaCarro(carro: Carro) {
    console.log(carro);
    this.navCtrl.push(EscolhaPage, { carro });
  }

}
