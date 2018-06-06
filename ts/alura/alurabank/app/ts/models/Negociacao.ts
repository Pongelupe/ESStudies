export class Negociacao {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    get volume() { return this.quantidade * this.valor; }
}