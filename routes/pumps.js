const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pump = require('../model');

router.get('/', function(req, res, next) {
  pump.find({})
		.exec((err, pumps) => res.json(pumps));
});

router.post('/', function(req, res, next) {
	const requestBody = req.body;
	const newPump = new pump(requestBody);
	newPump.save( (err, saved) => {
		pump
			.findOne({_id: saved._id})
			.exec((err, pump) => res.json(pump))
	});
});

router.get('/:name', function(req, res, next){
	const nameParam = req.params.name;
	pump.findOne({pumpName: nameParam})
	.exec( (err, result) => res.json(result));
});

router.put('/:name', (req, res, next) => {
	const nameParam = req.params.name;
	let upump = req.body;
	pump.findOne({pumpName: nameParam}, (err, data) => {
		data.pumpReason = upump.pumpReason;
		data.pumpSwitch = upump.pumpSwitch;
		data.save((err, updated) => res.json(updated));
	});
});

module.exports = router;