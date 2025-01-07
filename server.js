const express = require('express');
const si = require('systeminformation');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 3000;

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('Client connected');
    const sendSystemInfo = async () => {
        try {
            const cpu = await si.currentLoad();
            const mem = await si.mem();
            const osInfo = await si.osInfo();
            const processes = await si.processes();

            ws.send(JSON.stringify({
                cpu,
                mem,
                osInfo,
                processes
            }));
        } catch (error) {
            console.error(error);
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