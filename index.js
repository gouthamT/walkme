import express from 'express';
import routes from './server/routes/routes';

const app = express(), port = 2079;

app.use(express.json())

app.use('/', routes)

app.listen(port, () => console.log(`app is listening to port number ${port}`));