  const gates = [
    { number: 'A1', terminal: 'T1', status: 'on-time' },
    { number: 'A2', terminal: 'T1', status: 'boarding' },
    { number: 'A3', terminal: 'T1', status: 'delayed' },
    { number: 'B1', terminal: 'T2', status: 'on-time' },
    { number: 'B2', terminal: 'T2', status: 'delayed' },
    { number: 'B3', terminal: 'T2', status: 'boarding' },
    { number: 'C1', terminal: 'T3', status: 'on-time' },
    { number: 'C2', terminal: 'T3', status: 'boarding' },
    { number: 'C3', terminal: 'T3', status: 'delayed' },
    { number: 'C4', terminal: 'T3', status: 'on-time' },
    { number: 'D1', terminal: 'T1', status: 'on-time' },
    { number: 'D2', terminal: 'T2', status: 'boarding' },
    { number: 'D3', terminal: 'T3', status: 'delayed' },
    { number: 'D4', terminal: 'T4', status: 'on-time' },
  ];

  const possibleStatuses = ['on-time', 'delayed', 'boarding'];
  
  const gatesGrid = document.getElementById('gates-grid');
  const terminalFilter = document.getElementById('terminal-filter');
  const statusFilter = document.getElementById('status-filter');

  function renderGates(filterTerminal = 'all', filterStatus = 'all') {
    gatesGrid.innerHTML = '';
    const filtered = gates.filter(gate => {
      const matchesTerminal = filterTerminal === 'all' ? true : gate.terminal === filterTerminal;
      const matchesStatus = filterStatus === 'all' ? true : gate.status === filterStatus;
      return matchesTerminal && matchesStatus;
    });

    if (filtered.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'No gates match the selected filters.';
      emptyMsg.style.gridColumn = '1 / -1';
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.color = '#cbd5e1';
      emptyMsg.style.fontSize = '1.1rem';
      gatesGrid.appendChild(emptyMsg);
      return;
    }

    filtered.forEach(gate => {
      const card = document.createElement('div');
      card.className = 'gate-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');

      const gateNumber = document.createElement('div');
      gateNumber.className = 'gate-number';
      gateNumber.textContent = gate.number;

      const terminalLabel = document.createElement('div');
      terminalLabel.className = 'terminal-label';
      terminalLabel.textContent = gate.terminal;

      const statusLabel = document.createElement('div');
      statusLabel.className = 'status ' + gate.status;
      statusLabel.textContent = gate.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      card.appendChild(gateNumber);
      card.appendChild(terminalLabel);
      card.appendChild(statusLabel);

      gatesGrid.appendChild(card);
    });
  }

  terminalFilter.addEventListener('change', () => {
    renderGates(terminalFilter.value, statusFilter.value);
  });

  statusFilter.addEventListener('change', () => {
    renderGates(terminalFilter.value, statusFilter.value);
  });


  // Function to randomly update gate statuses periodically
  function updateGateStatuses() {
    // Randomly update some gates' statuses (e.g., 2 gates randomly every 8 seconds)
    const gatesToUpdateCount = 4;
    for (let i = 0; i < gatesToUpdateCount; i++) {
      // Pick a random gate index
      const index = Math.floor(Math.random() * gates.length);
      // Pick a random new status different from current status
      const currentStatus = gates[index].status;
      const possibleNewStatuses = possibleStatuses.filter(s => s !== currentStatus);
      const newStatus = possibleNewStatuses[Math.floor(Math.random() * possibleNewStatuses.length)];
      gates[index].status = newStatus;
    }
    // Re-render with current filters preserved
    renderGates(terminalFilter.value, statusFilter.value);
  }
  // Start periodic updates every 8 seconds
  setInterval(updateGateStatuses, 8000);

  // Initial render
  renderGates();
