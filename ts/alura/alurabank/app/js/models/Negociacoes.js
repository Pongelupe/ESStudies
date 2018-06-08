System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacoes;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                paraArray() { return [].concat(this._negociacoes); }
                toString() { console.log(JSON.stringify(this._negociacoes)); }
                ehIgual(negociacoes) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
