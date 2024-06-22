const peluchesRouter = require('express').Router();

//( CONTROLLERS )
const pelucheController = require('../controllers/peluche');
const Middleware = require('../middleware/auth-middleware');


// Creo un nuevo peluche
peluchesRouter.post("/peluches", Middleware.verify, async (req,res) =>{
    
    let userId = req.token.userId;
    let type = req.body.type;
    let color = req.body.color;
    let accessories = req.body.accessories;

    try{
      const result = await pelucheController.addpeluche(userId,type,color,accessories);
      
      if(result){
        res.status(201).send("Peluche creado correctamente"); 
      }
      else
      {
        res.status(404).send("No existe ningun usuario con ese ID"); 
      }
      
    }catch(error){
      console.log(error);
      res.status(500).send("Error al crear peluche."); 
    }  
    
  });
  

  // Elimino un peluche
  peluchesRouter.delete("/peluches/:id", Middleware.verify, async(req,res) =>{
  
    try{
  
      const result = await pelucheController.deletePeluche(req.params.id);
      if(result){
        res.status(200).send("Muñeco borrado.")
      }else{
        res.status(404).send("El muñeco no existe.")
      }  
  
    }catch(error){
      res.status(500).send("Error")
    }
  });
  
  
  peluchesRouter.get("/peluches", async (req, res) => {
    let limit = parseInt(req.query.limit) || 10;
    let offset = parseInt(req.query.offset) || 0;

    try {
      const results = await pelucheController.getAllpeluches(limit, offset);
      const totalpeluches = await pelucheController.contarDocumentos(); 
      
      res.status(200).json({
          result: results,
          totalCount: totalpeluches
      });
  } catch (error) {
      res.status(500).send("Error. Intente más tarde.");
  }
});
  

  module.exports = peluchesRouter;