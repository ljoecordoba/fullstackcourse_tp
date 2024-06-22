const usersRouter = require('express').Router();

//( CONTROLLERS )
const UsrController = require('../controllers/user');
const Middleware = require('../middleware/auth-middleware');


// Creo un nuevo usuario
usersRouter.post("/users", async (req, res) => {

  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let isActive = req.body.isActive;
  let password = req.body.password;

  try {
    const result = await UsrController.addUser(name, lastname, email, isActive, password);
    if (result) {
      res.status(201).send("Usuario creado correctamente"); // 201
    } else {
      res.status(409).send("El usuario ya existe"); // 409
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el usuario."); //500
  }

});

usersRouter.get("/users", Middleware.verify, async (req, res) => {

  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await UsrController.getAllUsers(limit, offset);
    res.status(200).json(results);

  } catch (error) {
    res.status(500).send("Error. Intente más tarde.")
  }

});

// Obtengo todos los peluches de un usuario
usersRouter.get('/users/me/dolls', Middleware.verify, async (req, res) => {

  let userId = req.token.userId;
  
  try {
  
    const result = await UsrController.getPeluchesByUser(userId);

    if (result) {
      res.status(200).json(result);
    } 
    else {
      res.status(404).send("No se ha podido encontrar los peluches.")
    }
  } 
  
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Obtengo mi propia informacion de usuario
usersRouter.get("/users/me", Middleware.verify, async (req, res) => {
  let userId = req.token.userId;
  try {
    const results = await UsrController.getUser(userId);
    res.status(200).json(results);

  } catch (error) {
    res.status(500).send("Error. Intente más tarde (CHECK)")
  }

});


// Obtengo un usuario por ID
usersRouter.get("/users/:id", Middleware.verify, async (req, res) => {

  try {
    const results = await UsrController.getUser(req.params.id);
    res.status(200).json(results);

  } catch (error) {
    res.status(500).send("Error. Intente más tarde (CHECK)")
  }

});


// Modifico un usuario
usersRouter.put("/users/:id", Middleware.verify, async (req, res) => {

  const user = { _id: req.params.id, ...req.body };
  // {_id: req.params.id, name: req.body.name, lastname, email }

  console.log(user);
  try {

    const result = await UsrController.editUser(user);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("El usuario no existe.");
    }
  } catch (error) {
    res.status(500).send("Error");
  }

});


// Elimino un usuario
usersRouter.delete("/users/:id", Middleware.verify, async (req, res) => {

  try {

    const result = await UsrController.deleteUser(req.params.id);
    if (result) {
      res.status(200).send("Usuario borrado.")
    } else {
      res.status(404).send("No se ha podido eliminar el usuario.")
    }

  } catch (error) {
    res.status(500).send("Error")
  }
});


module.exports = usersRouter;