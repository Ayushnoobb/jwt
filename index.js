const express = require('express');
const { urlencoded } = require('express');
const authRouter = require('./controllers/auth/authController.js');
const cors = require('cors');
const dotenv = require('dotenv');
const { authenticateToken } = require('./middleware/authMiddleWare.js');

dotenv.config();

const app = express();
const router = express.Router();

app.use(urlencoded({ extended: false }));

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
