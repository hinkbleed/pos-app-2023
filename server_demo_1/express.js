const express = require('express');
const list = require('./db/uevents/poli02301.json');

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.get('/storage/poli', (req, res) => {
  res.json(list);
});

app.post('/', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});
