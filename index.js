const express = require('express');
const cors = require('cors');

const authRouter = require('./controllers/auth/authController.js');
const { authenticateToken } = require('./middleware/authMiddleWare.js');

const dotenv = require('dotenv');
dotenv.config();


const app = express();

const { urlencoded } = require('express');
app.use(urlencoded({ extended: false }));
const router = express.Router();

const {MongoClient} = require("mongodb")
const client = new MongoClient(process.env.mongo_url)

app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
    exposedHeaders: ['sessionId'],
    origin: ['https://eccentrictoad.com', 'https://www.eccentrictoad.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    preflightContinue: false,
  })
);

app.use(router);
app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ name: 'ayush' });
});

app.get("/db" , async(req , res) => {
  try{
    await client.connect();
    const db = client.db("Online-Mart")
    const products = db.collection("product")

    const responseProduct = await products.find({}).toArray();
    res.json(responseProduct);
  }catch(error){
    console.error("cannot connect to db" , error);
    // if(error){
    //   res.sendStatus(500).json({status : "failed"})
    // }
  }finally{
    client.close()
  }
})

const users = [
  {
    username: 'ayush',
  },
  {
    username: 'ankit',
  },
];

app.post('/api/post', authenticateToken, (req, res) => {
  const response = users.filter((post) => {
    return post.username == req.user.name;
  });
  res.json(response);
});

app.listen(3001);
