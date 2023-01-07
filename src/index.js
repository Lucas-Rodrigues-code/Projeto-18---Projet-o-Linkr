import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js'
import trendingRoutes from './routes/trending.routes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(trendingRoutes)

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Running in port ${port}`));