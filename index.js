const express = require('express');

const db = require('./data/db'); // returns an instance of knex already configred to use sqllite by reading the development key

const server = express();

server.use(express.json());

// endpoints here

server.get('/', (req,res) => {
  res.send('up and running...')
})

server.get('/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
})

server.post('/zoos', (req,res) => {
  const zoo = req.body; //zoo can be an array here. don't have to enter one by one.
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      const id = ids[0];
      res.status(201).json({id, ...zoo});
    })
    .catch(err => res.status(500).json(err)) //knex and sqlite3 driver translates this to the sqlite3 sql language 
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
