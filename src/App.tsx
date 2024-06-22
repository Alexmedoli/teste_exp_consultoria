import express from 'express';
import { json } from 'body-parser';
import dataRoutes from './routes/dataRoutes';

const app = express();
app.use(json());
app.use('/api/data', dataRoutes);

export default app;