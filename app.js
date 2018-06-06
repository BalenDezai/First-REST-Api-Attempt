import dotenv from  'dotenv';
import express from 'express';
import serverDebug from 'debug';
import morgan from 'morgan';
import mongoose from 'mongoose';
import seedDB from './lib/utils/seedDB';
import peopleRoute from './routes/peopleRouter';
import walletRoute from './routes/walletRouter';
import bodyParser from 'body-parser';


dotenv.config();
const debug = serverDebug('app');
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.DB_URL);

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

seedDB();

app.use(morgan('combined'));


app.use('/people', peopleRoute);
app.use('/wallet', walletRoute);


app.listen(port, () => {
  debug(`Server started on port: ${port}`);
});