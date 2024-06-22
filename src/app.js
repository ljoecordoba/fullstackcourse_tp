
const {PORT} = require('./utils/config');
const {MONGODB_URI} = require('./utils/config');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
app.use(express.json());

const usersRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const pelucheRouter = require('./routes/pelucheRouter');
const rankingRouter = require('./routes/rankingRouter');


//mongoose
  //.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 // .then(() => {
//    console.log("connected");
//  })
//  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', usersRouter);
app.use('/api', pelucheRouter);
app.use('/api', rankingRouter);



// Endpont main.
app.get("/", (req, res) => {
  res.status(200).json("Hola estoy funcionando.");
});


app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
