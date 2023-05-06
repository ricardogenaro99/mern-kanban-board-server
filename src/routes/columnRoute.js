const expres = require('express');
const { columnModel: defModel, boardModel } = require('../models');

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
		const { boardId } = req.body;

		const model = defModel(req.body);
		const board = await boardModel.findById(boardId);
		board.columns.push(model._id);

		const data = await model.save();
		await board.save();

		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		const data = await defModel.findById(model._id).populate('tasks');
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post('/find', async (req, res) => {
	try {
		const { boardId } = req.body;
		const board = await boardModel.findById(boardId).populate({
			path: 'columns',
			populate: {
				path: 'tasks',
				model: 'Task',
			},
		});
		const data = board.columns;
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const model = await defModel.findByIdAndDelete(req.params.id);
		const boardColumns = await boardModel.findById(model.boardId);
		boardColumns.columns = boardColumns.columns.filter(
			(column) => !column.equals(req.params.id),
		);
		await boardColumns.save();
		const data = await defModel.findById(model._id).populate('tasks');
		res.status(200).json(data)
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
