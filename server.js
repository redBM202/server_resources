const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/launch-task-manager', (req, res) => {
    exec('taskmgr', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Failed to launch Task Manager');
            return;
        }
        res.send('Task Manager launched successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});