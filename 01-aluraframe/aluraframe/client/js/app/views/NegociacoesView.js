'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacoesView = function () {
    function NegociacoesView(target) {
        _classCallCheck(this, NegociacoesView);

        this._target = target;
    }

    _createClass(NegociacoesView, [{
        key: '_build',
        value: function _build(model) {
            return '\n    <table class="table table-hover table-bordered">\n        <thead>\n            <tr>\n                <th>DATA</th>\n                <th>QUANTIDADE</th>\n                <th>VALOR</th>\n                <th>VOLUME</th>\n            </tr>\n        </thead>\n        \n        <tbody>\n            ' + model.negociacoes.map(function (negociacao) {

                return '\n                <tr>\n                    <td>' + negociacao.data + '</td>\n                    <td>' + negociacao.quantidade + '</td>\n                    <td>' + negociacao.valor + '</td>\n                    <td>' + negociacao.volume + '</td>\n                </tr>\n                ';
            }).join('') + '\n        </tbody>\n        \n        <tfoot>\n            <td colspan="3"></td>\n            <td>\n                ' + model.negociacoes.reduce(function (total, n) {
                return total + n.volume;
            }, 0.0) + '\n            </td>\n        </tfoot>\n    </table>\n        ';
        }
    }, {
        key: 'update',
        value: function update(model) {
            this._target.innerHTML = this._build(model);
        }
    }]);

    return NegociacoesView;
}();