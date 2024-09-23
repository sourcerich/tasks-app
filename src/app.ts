import express from 'express';
import path from 'path'; // Import path module
import { routes } from './routes/route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
