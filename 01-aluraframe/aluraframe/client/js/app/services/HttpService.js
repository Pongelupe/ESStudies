'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handleErrors',
        value: function _handleErrors(res) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handleErrors(res);
            }).then(function (res) {
                return res.json();
            });
        }
    }, {
        key: 'post',
        value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            }).then(function (res) {
                return _this2._handleErrors(res);
            }).then(function (res) {
                return _this2._handleErrors(res);
            });
        }
    }]);

    return HttpService;
}();