import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

// In-memory store for demo (replace with PG/Redis)
const nodes = new Map();
const tasks = new Map();

// --- API Endpoints ---

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0-alpha' });
});

// Node Registration
app.post('/v1/nodes/register', (req, res) => {
  const { node_name, capabilities } = req.body;
  const id = uuidv4();
  const newNode = { id, node_name, capabilities, status: 'online', last_seen: new Date() };
  nodes.set(id, newNode);
  res.status(201).json(newNode);
});

// Task Dispatch
app.post('/v1/tasks/dispatch', (req, res) => {
  const { target_node_id, tool_name, arguments: args } = req.body;
  const taskId = uuidv4();
  const task = { id: taskId, target_node_id, tool_name, arguments: args, status: 'pending' };
  tasks.set(taskId, task);

  // Notify target node via WS (logic to be implemented)
  console.log(`Task ${taskId} dispatched to ${target_node_id}`);
  
  res.status(202).json({ taskId });
});

// --- WebSocket Handling ---

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'IDENTIFY') {
      ws.nodeId = data.nodeId;
      console.log(`Node ${data.nodeId} identified`);
    }
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });
});

server.listen(PORT, () => {
  console.log(`OpenClaw Nexus Hub running on port ${PORT}`);
});
