const express = require('express');
const { columnModel: defModel, taskModel } = require('../models');

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
		const data = await model.save();

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
		const data = await defModel.findById(req.params.id).populate('tasks');
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndDelete(req.params.id);
		const board = await boardModel.findById(model.boardId);

		await taskModel.deleteMany({ columnId: model._id });
		board.columns = board.columns.filter((column) => column._id !== model._id);
		await board.save();

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
