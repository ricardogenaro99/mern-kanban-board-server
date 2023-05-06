const expres = require('express');
const { taskModel: defModel, columnModel } = require('../models');

const router = expres.Router();

router.get('/', async (req, res) => {
	try {
		const models = await defModel.find();
		res.status(200).json(models);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const model = await defModel.findById(req.params.id);
		res.status(200).json(model);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { columnId } = req.body;

		const model = defModel(req.body);
		const column = await columnModel.findById(columnId);
		column.tasks.push(model._id);

		const data = await model.save();
		await column.save();
		
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

module.exports = router;
