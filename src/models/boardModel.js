const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		columns: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Column',
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Board', schema);
