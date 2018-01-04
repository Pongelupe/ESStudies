class ListaNegociacao {

    constructor() {
        this._negociacoes = [];
    }

    add(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }
}