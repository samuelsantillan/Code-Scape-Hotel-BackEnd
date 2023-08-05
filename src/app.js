import express from 'express';
import morgan from 'morgan';
import roomRoutes from './routes/room.routes.js';


const app = express();

app.use(morgan('dev')); // morgan is a middleware
app.use(express.json()); // express.json is a middleware
app.use('/api', roomRoutes);

export default app;