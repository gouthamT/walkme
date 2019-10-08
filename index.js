import express from 'express';
import open from 'open';
import routes from './server/routes/routes';

const app = express(), port = 2079;

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log(`Toppings app listening on port http://localhost:${port}/`);
  open(`http://localhost:${port}/`);
  console.log('Press Ctrl+C to quit.')
})