const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		columnId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Column',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Task', schema);
