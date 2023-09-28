const jsonwebtoken = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return res.sendStatus(403);

  jsonwebtoken.verify(token, process.env.access_token_secret, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user.name);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
