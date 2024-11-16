const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

const getUsers = () => {
  const data = fs.readFileSync('./users.json', 'utf8');
  return JSON.parse(data);
};

app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = getUsers();
  const user = Object.values(users).find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/users/profession/:profession', (req, res) => {
  const users = getUsers();
  const result = Object.values(users).filter(u => u.profession === req.params.profession);
  if (result.length) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'No users found with that profession' });
  }
});

app.get('/users/name/:name', (req, res) => {
  const users = getUsers();
  const user = Object.values(users).find(u => u.name.toLowerCase() === req.params.name.toLowerCase());
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Hi there stranger! The available endpoints are: /users, /users/:id, /users/profession/:profession, /users/name/:name');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
