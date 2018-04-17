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
	  
	  const Pump = model('Pump', pumpSchema);
	  
	  module.exports = Pump;