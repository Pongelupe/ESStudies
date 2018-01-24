class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoesView')), 'add', 'esvazia');

    }


    adiciona(event) {
        event.preventDefault();

        let data = new Date(this._inputData.value.split("-"));
        let negociacao = new Negociacao(data,
            this._inputQuantidade.value,
            this._inputValor.value);

        this._listaNegociacoes.add(negociacao);

        console.log(this._listaNegociacoes);

        this._limpaForm();
    }

    importarNegociacoes() {
        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.add(negociacao);
            }))
            .catch(erro => console.log(erro));
    }

    apaga() {

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _limpaForm() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.1;

        this._inputData.focus();
    }
}