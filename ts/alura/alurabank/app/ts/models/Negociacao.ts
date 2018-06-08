import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';
export class Negociacao implements Imprimivel, Igualavel<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    get volume() { return this.quantidade * this.valor; }

    toString(): void {
        console.log(
            `Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`
        );
    }
    ehIgual(negociacao: Negociacao) {
        return (negociacao.data == this.data &&
            this.quantidade == negociacao.quantidade &&
            this.valor == negociacao.valor);
    }

}