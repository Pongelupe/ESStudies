module.exports = function (app) {

    var api = app.api.pokemon;

    app.route('/v1/pokemon')
        .get(api.list)
        .post(api.add);

    app.route('/v1/pokemon/:id')
        .get(api.findById)
        .delete(api.removeById)
        .put(api.update);
};
