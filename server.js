const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { getSystemInfo } = require('./systemInfo'); // Import the OS-specific configuration

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 3000;

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('Client connected');
    const sendSystemInfo = async () => {
        try {
            const systemInfo = await getSystemInfo();
            ws.send(JSON.stringify(systemInfo));
        } catch (error) {
            console.error('Error fetching system information:', error);
            ws.send(JSON.stringify({ error: 'Failed to fetch system information' }));
        }
    };

    sendSystemInfo();
    const interval = setInterval(sendSystemInfo, 5000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});