import config from './config';
import apiRouter from './api';
import express from 'express';
const server = express();

server.use('/api', apiRouter);
server.use(express.static('public'));

server.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));

server.listen(config.port, () => {
    console.log('The app is listening on port ', config.port);
})