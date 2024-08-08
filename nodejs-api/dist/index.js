"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// FastAPI service URL
const FASTAPI_URL = 'http://localhost:8000'; // Adjust if necessary
// Send a query to the FastAPI service
app.post('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, conversation_id, model_name } = req.body;
    try {
        const response = yield axios_1.default.post(`${FASTAPI_URL}/query/`, {
            query,
            conversation_id,
            model_name
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}));
// List all conversations
app.get('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${FASTAPI_URL}/conversations/`);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching conversations' });
    }
}));
// Get a specific conversation by ID
app.get('/conversations/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield axios_1.default.get(`${FASTAPI_URL}/conversations/${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Conversation not found' });
    }
}));
// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Node.js API is running' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
