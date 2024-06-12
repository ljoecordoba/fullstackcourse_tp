const Peluche = require('../models/peluche');
const User = require('../models/user');

exports.createPeluche = async (req, res) => {
    const { type, color, accessories } = req.body;
    try {
        const Peluche = new Peluche({ type, color, accessories, user: req.user.id });
        await Peluche.save();
        const user = await User.findById(req.user.id);
        user.Peluches.push(Peluche);
        await user.save();
        res.status(201).send(Peluche);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.getPeluches = async (req, res) => {
    try {
        const Peluches = await Peluche.find({ user: req.user.id });
        res.send(Peluches);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.deletePeluche = async (req, res) => {
    try {
        const Peluche = await Peluche.findById(req.params.id);
        if (!Peluche || Peluche.user.toString() !== req.user.id) {
            return res.status(404).send({ message: 'Peluche not found' });
        }
        await Peluche.remove();
        res.send({ message: 'Peluche deleted' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
