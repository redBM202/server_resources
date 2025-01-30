const si = require('systeminformation');

async function getSystemInfo() {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const osInfo = await si.osInfo();
        const cpuDetails = await si.cpu();
        const memDetails = await si.memLayout();

        return {
            cpu,
            mem,
            osInfo,
            cpuDetails,
            memDetails: {
                speed: memDetails[0]?.clockSpeed || 'N/A',
                used: memDetails.length,
                total: memDetails.length
            }
        };
    } catch (error) {
        console.error('Error fetching system information:', error);
        throw error;
    }
}

module.exports = { getSystemInfo };
