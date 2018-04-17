var mongoose = require('mongoose');

module.exports = function (app) {

	var api = {};

	var model = mongoose.model('Pokemon');

	api.list = (req, res) => {

		model.find()
			.then((pokemons) => {
				res.json(pokemons);
			}, (error) => {
				console.log(error);
				res.sendStatus(500);
			});

	};

	api.findById = (req, res) => {

		model.findById(req.params.id)
			.then((pokemon) => {
				if (!pokemon) throw new Error('Pokemon not found');
				res.json(pokemon);
			}, (error) => {
				console.log(error);
				res.sendStatus(500);
			});
	};

	api.removeById = (req, res) => {

		model.remove({ '_id': req.params.id })
			.then(() => {
				res.sendStatus(200);
			}, (error) => {
				console.log(error);
				res.sendStatus(500);
			});

	};

	api.add = (req, res) => {

		model.create(req.body)
			.then((pokemon) => {
				res.json(pokemon);
			}, (error) => {
				console.log('nope');
				res.sendStatus(500);
			});
	};

	api.update = (req, res) => {

		model.findByIdAndUpdate(req.params.id, req.body)
			.then((pokemon) => {
				res.json(pokemon);
			}, (error) => {
				console.log(error);
				res.sendStatus(500);
			})
	};

	return api;
};