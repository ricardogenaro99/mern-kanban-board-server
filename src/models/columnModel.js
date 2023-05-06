const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
		boardId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Board',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Column', schema);
