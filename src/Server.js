import  express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import db from './db/index';



let app = express();
app.use('', router);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Api Server listening on port ', process.env.SERVER_PORT);
});