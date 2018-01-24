class NegociacoesView {

    constructor(target) {

        this._target = target;
    }

    _build(model) {
        return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${model.negociacoes.map(negociacao => {

                return `
                <tr>
                    <td>${negociacao.data}</td>
                    <td>${negociacao.quantidade}</td>
                    <td>${negociacao.valor}</td>
                    <td>${negociacao.volume}</td>
                </tr>
                `
            }).join('')}
        </tbody>
        
        <tfoot>
            <td colspan="3"></td>
            <td>
                ${model.negociacoes.reduce(function(total, n) {
                    return total + n.volume;
            }, 0.0)
            }
            </td>
        </tfoot>
    </table>
        `; 
    }

    update(model) {
        this._target.innerHTML = this._build(model);
    }
}
