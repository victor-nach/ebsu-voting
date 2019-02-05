import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';

// Set up the express app
const app = express();

const PORT = process.env.PORT || 3065;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico 2018' });
});

app.all('*', (req, res) => {
  res
    .status(404)
    .json({ message: 'Sorry, such endpoint does not exist' });
});

app.listen(PORT, () => {
});

export default app;
