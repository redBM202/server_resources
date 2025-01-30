function updateProcessesInfo(processes) {
    const groupedProcesses = groupProcessesByName(processes.list);
    const processesInfoContent = document.getElementById('processes-info-content');
    processesInfoContent.innerHTML = '';

    for (const [name, procs] of Object.entries(groupedProcesses)) {
        const button = document.createElement('button');
        button.className = 'collapsible';
        button.textContent = `${name} (${procs.length})`;
        processesInfoContent.appendChild(button);

        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = `<pre>${formatProcesses(procs)}</pre>`;
        processesInfoContent.appendChild(content);
    }

    const coll = document.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
}

function groupProcessesByName(processes) {
    return processes.reduce((acc, proc) => {
        if (!acc[proc.name]) {
            acc[proc.name] = [];
        }
        acc[proc.name].push(proc);
        return acc;
    }, {});
}

function formatProcesses(processes) {
    return processes.map(proc => `Name: ${proc.name}, CPU: ${proc.cpu.toFixed(2)}%`).join('\n');
}