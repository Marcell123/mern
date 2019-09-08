const express = require('express');
const router = express.Router();

// load User model
const User = require('../../models/User');

//Add todo item
router.post('/add', (req, res) => {
	const newUser = new User(req.body);
	newUser
		.save()
		.then(user => {
			res.status(200).json({'user': 'task is added successfully'});
		})
		.catch(err => {
			res.status(400).send('unable to save to database');
		});
});

// Get lists of items
router.get('/', (req, res) => {
	User.find( (err, tasks) => {
		if(err) {
			console.log(err);
		} else {
			res.json(tasks);
		}
	});
});

// router.get('/', (req, res) => {
// 	User.find().sort({ _id: -1 }).exec((err, tasks) => {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			res.json(tasks);
// 		}
// 	});
// });

//Defined edited user's task
router.get('/edit/:id', (req, res) => {
	const { id } = req.params;
	User.findById(id, (err, userTask) => {
		res.json(userTask);
	});
});

//Defined updated user's task
router.post('/update/:id', (req, res) => {
	User.findById(req.params.id, (err, userTask) => {
		if(!userTask) {
			res.status(404).send('data is not found');
		} else {
			userTask.name = req.body.name;
			userTask.surname = req.body.surname;
			userTask.task = req.body.task;

			userTask
				.save()
				.then(userTask => res.json('Update completed'))
				.catch(err => {
					res.status(400).send('unable to update the database');
				});
		}
	});
});

//Delete user's task
router.post('/delete/:id', (req, res) => {
	User.findOneAndDelete({_id: req.params.id}, (err, userTask) =>{
		if(err) {
			res.json(err);
		} else {
			res.json('Successfully removed');
			console.log('deleted=)');
		}
	});
});

module.exports = router;