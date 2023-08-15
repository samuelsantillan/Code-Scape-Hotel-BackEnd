import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contact.routes.js';
import connectDb from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
connectDb();

app.use('/', contactRoutes);


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});