require('mongoose');
const Ranking = require('../models/ranking');


const getTopPeluches = async () => {
    const topPeluches = await Ranking.find({})
      .sort({ chosenCount: -1 })
      .limit(3)  
    return topPeluches;
  };


  module.exports = {getTopPeluches}


