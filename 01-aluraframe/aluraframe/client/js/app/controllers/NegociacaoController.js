class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');        
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacao();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);

    }

    adiciona(event) {
        event.preventDefault();

        let data = new Date(this._inputData.value.split("-"));
        let negociacao = new Negociacao(data,
            this._inputQuantidade.value,
            this._inputValor.value);

        this._listaNegociacoes.add(negociacao);

        console.log(this._listaNegociacoes);

        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaForm();
    }

    _limpaForm() {

    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.1;

    this._inputData.focus();
    }

}