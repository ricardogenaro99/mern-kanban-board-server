const express = require('express');
const { taskModel: defModel, columnModel, taskModel } = require('../models');

const router = express.Router();

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
		const model = await defModel(req.body);

		const column = await columnModel.findById(model.columnId);
		column.tasks.push(model._id);

		const data = await model.save();
		await column.save();

		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.put('/:id', async (req, res) => {
	try {
		await defModel.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		const data = await defModel.findById(model._id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndDelete(req.params.id);
		const column = await columnModel.findById(model.columnId);

		column.tasks = column.tasks.filter((task) => task._id !== model._id);
		await column.save();

		res.status(200).json(model);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.post('/find', async (req, res) => {
	try {
		const data = await defModel.find({ ...req.body });
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

module.exports = router;
