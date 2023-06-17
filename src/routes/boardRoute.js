const express = require('express');
const { boardModel: defModel, taskModel } = require('../models');

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
		res.status(400).json(error);
	}
});

router.put('/:id', async (req, res) => {
	try {
		await defModel.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		const data = await defModel.findById(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndDelete(req.params.id);
		const columns = model.columns;

		await Promise.all(
			columns.map(async (e) => {
				const column = await columnModel.findByIdAndDelete(e);
				await taskModel.deleteMany({ columnId: column._id });
			}),
		);

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
