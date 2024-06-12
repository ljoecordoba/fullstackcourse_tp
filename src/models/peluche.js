const mongoose = require('mongoose');
const Schema = moongose.Schema;
const plushieSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['perro', 'conejo', 'oso', 'mapache', 'gato'], 
        required: true 
    },
    color: { 
        type: String, 
        enum: ['rosa', 'amarillo', 'verde'], 
        required: true 
    },
    accessories: { 
        type: String, 
        enum: ['camiseta y pelota de futbol', 'guitarra eléctrica', 'notebook'], 
        required: true 
    },
    user: 
    { type: Schema.Types.ObjectId, ref: 'usr' }
});

const Peluche = mongoose.model('peluche', plushieSchema);
module.exports = Peluche;
