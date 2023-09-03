import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import newsletterRoutes from './routes/newsletter.routes.js';
import connectDb from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
connectDb();

app.use('/', newsletterRoutes);


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});