const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	task: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'userTask'
});

module.exports = UserTask = mongoose.model('User', UserSchema);