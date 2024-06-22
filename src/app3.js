const mongoose = require('mongoose');
const { addUser } = require('./controllers/user'); // Ajusta la ruta según sea necesario
const {addPeluche} = require('./controllers/peluche');
const mongo_uri = "mongodb+srv://ljoecordoba:Dfs2YHLvArk533UD@cluster0.yxhcvrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Conectar a MongoDB
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));



    
//(async () => {
//    const name = "Admin";
//    const lastname = "User";
//    const email = "admin@example.com";
//    const isActive = true;
//    const password = "yourpassword";
//
//    try {
//        const result = await addUser(name, lastname, email, isActive, password);
//        if (result) {
//            console.log('User created successfully:', result.user);
//        } else {
//            console.log('User already exists');
//        }
//    } catch (err) {
//        console.error(err);
//    } finally {
//        mongoose.connection.close();
//    }
//})();

(async () => {
    const name = "Admin";
    const lastname = "User";
    const email = "admin@example.com";
    const isActive = true;
    const password = "yourpassword";

    try {
        const result = await createPeluche();
        if (result) {
            console.log('User created successfully:', result.user);
        } else {
            console.log('User already exists');
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
})();
