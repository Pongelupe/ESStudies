var db = require('../../config/database');

var api = {}

api.adiciona = function (req, res) {
    var programa = req.body;
    delete programa._id;
    db.insert(programa, (err, newDoc) => {
        if (err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newDoc._id);
        res.json(newDoc._id);
    });
};

api.busca = function (req, res) {
    db.findOne({ _id: req.params.programaId }, function (err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function (req, res) {
    console.log('Parâmetro recebido:' + req.params.fotoId);
    db.update({ _id: req.params.fotoId }, req.body, function (err, numReplaced) {
        if (err) return console.log(err);
        if (numReplaced) {
            res.status(200).end();
            console.log('Atualizado com sucesso: ' + req.body._id);
        } else {
            res.status(500).end();
        }
    });
};

api.lista = function (req, res) {
    db.find({}).exec(function (err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.remove = function (req, res) {

    db.remove({ _id: req.params.fotoId }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        if (numRemoved) {
            console.log('removido com sucesso');
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    });
};


module.exports = api;