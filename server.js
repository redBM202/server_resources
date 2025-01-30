const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { getSystemInfo } = require('./systemInfo'); // Import the OS-specific configuration

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 3000;

const logFile = path.join(__dirname, 'server.log');

function logToFile(message) {
    const timestamp = new Date().toISOString();
    fs.appendFile(logFile, `[${timestamp}] ${message}\n`, (err) => {
        if (err) console.error('Failed to write to log file:', err);
    });
}

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('Client connected');
    logToFile('Client connected');
    const sendSystemInfo = async () => {
        try {
            const systemInfo = await getSystemInfo();
            ws.send(JSON.stringify(systemInfo));
        } catch (error) {
            console.error('Error fetching system information:', error);
            console.error('Error details:', error.message, error.stack);
            logToFile(`Error fetching system information: ${error.message}\n${error.stack}`);
            ws.send(JSON.stringify({ error: 'Failed to fetch system information' }));
        }
    };

    sendSystemInfo();
    const interval = setInterval(sendSystemInfo, 5000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
        logToFile('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    logToFile(`Server running at http://localhost:${port}`);
});