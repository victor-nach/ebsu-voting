import express from 'express';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

const PORT = 5000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get all todos
app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'we in business bro',
  })
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});