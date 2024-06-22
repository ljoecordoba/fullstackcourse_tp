const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pelucheSchema = new mongoose.Schema({
	type:{
		type: String, required:true
	},
	
	color:{ type: String, required:true
    },
    
	accessories:{ type: String, required:true
	},
	
	user: { type: Schema.Types.ObjectId,
		ref: 'usr',
		required: true
	}
});

const Peluche = mongoose.model('peluche', pelucheSchema);
module.exports = Peluche;
