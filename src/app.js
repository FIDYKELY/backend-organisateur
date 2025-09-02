import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes)
app.use("/projects", projectRoutes);
app.use("/", taskRoutes);

app.get('/', (req, res) => {
    res.send('API en ligne 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});

export default app;