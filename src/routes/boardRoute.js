const expres = require('express');
const { boardModel: defModel, columnModel } = require('../models');

const router = expres.Router();

const populateConfig = {
	path: 'columns',
	populate: {
		path: 'tasks',
		model: 'Task',
	},
};

router.get('/', async (req, res) => {
	try {
		const models = await defModel.find().populate(populateConfig);
		res.status(200).json(models);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const model = await defModel.findById(req.params.id);
		res.status(200).json(await model.populate(populateConfig));
	} catch (error) {
		res.status(400).json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const model = await defModel(req.body);
		const data = await model.save();

		res.status(201).json(await data.populate(populateConfig));
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndDelete(req.params.id);
		columnModel.deleteMany({ boardId: req.params.id });
		res.status(200).json(await model.populate(populateConfig));
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
