const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;
	  
	  const pumpSchema = Schema({
		  id: ObjectId,
		  pumpName: String,
		  pumpReason: String,
		  pumpSwitch: Number,
	  });

const userSchema = Schema({
	id: ObjectId,
	name: String,
	email: { type: String, unique: true, required: true, lowercase: true },
	hash_password: { type: String, required: true },
	admin: {type: Boolean, required: true},
	date_created: {type: Date, default: Date.now}
	  });
	  
	const Pump = model('Pump', pumpSchema);
	const User = model('User', userSchema);
	  
module.exports = { Pump, User };