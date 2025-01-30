const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('WebSocket connection established');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    alert('Failed to connect to the server. Please try again later.');
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
    alert('Connection to the server was closed.');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    document.getElementById('os-info').querySelector('pre').textContent = formatOSInfo(data.osInfo);
    updateCPUChart(data.cpu);
    updateMemChart(data.mem);
    document.getElementById('cpu-details-content').textContent = formatCPUDetails(data.cpuDetails);
    document.getElementById('mem-details-content').textContent = formatMemDetails(data.memDetails);
};

function formatOSInfo(osInfo) {
    return `Platform: ${osInfo.platform}\nDistro: ${osInfo.distro}\nRelease: ${osInfo.release}\nCodename: ${osInfo.codename}`;
}

function formatCPUDetails(cpuDetails) {
    return `Name: ${cpuDetails.manufacturer} ${cpuDetails.brand}\nCores: ${cpuDetails.physicalCores}\nClock Speed: ${cpuDetails.speed} GHz`;
}

function formatMemDetails(memDetails) {
    return `Speed: ${memDetails.speed} MHz\nSlots Used: ${memDetails.used}`;
}