System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacao;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(data, quantidade, valor) {
                    this.data = data;
                    this.quantidade = quantidade;
                    this.valor = valor;
                }
                get volume() { return this.quantidade * this.valor; }
                toString() {
                    console.log(`Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`);
                }
                ehIgual(negociacao) {
                    return (negociacao.data == this.data &&
                        this.quantidade == negociacao.quantidade &&
                        this.valor == negociacao.valor);
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
