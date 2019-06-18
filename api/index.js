import express from 'express';
import data from './sample.json';
const router = express.Router();

router.get('/getData', (req, res) => {
    res.send({ data: data.response});
});

export default router;
