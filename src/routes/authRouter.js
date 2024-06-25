const authRouter = require('express').Router();

//( CONTROLLERS )
const AuthController = require('../controllers/auth');


authRouter.post("/login", async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    try{
      const result = await AuthController.login(email,password);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(401).send("Credenciales invalidas")
      }
    }catch(error){
        console.log(error)
        res.status(500).send("Error");
    }  
})



module.exports = authRouter;