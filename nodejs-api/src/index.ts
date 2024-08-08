import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const FASTAPI_URL = 'http://0.0.0.0:8000'; // Adjust if necessary

// Send a query to the FastAPI service
app.post('/query', async (req: Request, res: Response) => {
    const { query, conversation_id, model_name } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_URL}/query/`, {
            query,
            conversation_id,
            model_name
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error communicating with FastAPI service' });
    }
});

// List all conversations
app.get('/conversations', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${FASTAPI_URL}/conversations/`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching conversations' });
    }
});

// Get a specific conversation by ID
app.get('/conversations/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`${FASTAPI_URL}/conversations/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Conversation not found' });
    }
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Node.js API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
