import { logarTempoDeExecucao } from '../helpers/decorators/logarTempoDeExecucao';

export abstract class View<T> {

    protected _elemento: JQuery

    constructor(seletor: string, private _escapar: boolean = false) {
        this._elemento = $(seletor);
    }

    @logarTempoDeExecucao(true)
    update(model: T): void {
        let template = this.template(model)
        if (this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '')
        this._elemento.html(template);
    }

    abstract template(model: T): string

}