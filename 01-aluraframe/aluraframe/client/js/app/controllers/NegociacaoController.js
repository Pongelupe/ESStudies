'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoesView')), 'add', 'esvazia');
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',
        value: function adiciona(event) {
            event.preventDefault();

            var data = new Date(this._inputData.value.split("-"));
            var negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);

            this._listaNegociacoes.add(negociacao);

            console.log(this._listaNegociacoes);

            this._limpaForm();
        }
    }, {
        key: 'importarNegociacoes',
        value: function importarNegociacoes() {
            var _this = this;

            var service = new NegociacaoService();
            service.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this._listaNegociacoes.add(negociacao);
                });
            }).catch(function (erro) {
                return console.log(erro);
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            this._listaNegociacoes.esvazia();

            this._mensagem.texto = 'Negociações apagadas com sucesso';
        }
    }, {
        key: '_limpaForm',
        value: function _limpaForm() {

            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.1;

            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();