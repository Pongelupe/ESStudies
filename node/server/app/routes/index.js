var api = require('../api');


module.exports = function (app) {

    app.route('/v1/programa')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/v1/programa/:programaId')
        .delete(api.remove)
        .get(api.busca)
        .put(api.atualiza);
};