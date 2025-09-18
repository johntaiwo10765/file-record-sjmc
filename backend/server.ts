// FIX: Changed imports to use ES module syntax.
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// FIX: Using a named import for the router to ensure module compatibility.
import { router as apiRouter } from './api';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRouter);

// Serve frontend
// In a real deployment, you would build the React app and serve the static files.
// For this environment, we assume the frontend is served separately.
// If you were to serve them together, you'd use:
// app.use(express.static(path.join(__dirname, '..', 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
// });

app.listen(port, () => {
  console.log(`SJMC backend server running at http://localhost:${port}`);
});