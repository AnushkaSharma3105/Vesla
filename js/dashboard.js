const phEl = document.getElementById('phVal');
const tdsEl = document.getElementById('tdsVal');
const turbEl = document.getElementById('turbidityVal');
const presEl = document.getElementById('pressureVal');
const eventsEl = document.getElementById('events');

const ctx = document.getElementById('chartQuality').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: { labels: [], datasets: [
    { label: 'pH', data: [], borderColor: 'cyan' },
    { label: 'TDS', data: [], borderColor: 'lime' },
    { label: 'Turbidity', data: [], borderColor: 'yellow' },
    { label: 'Pressure', data: [], borderColor: 'magenta' },
  ]},
  options: { animation: false }
});

function addEvent(text) {
  const li = document.createElement('li');
  li.textContent = text;
  eventsEl.prepend(li);
}

function updateUI(ph, tds, turb, pres) {
  phEl.textContent = ph.toFixed(2);
  tdsEl.textContent = Math.round(tds);
  turbEl.textContent = turb.toFixed(2);
  presEl.textContent = pres.toFixed(2);
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(ph);
  chart.data.datasets[1].data.push(tds);
  chart.data.datasets[2].data.push(turb);
  chart.data.datasets[3].data.push(pres);
  if (chart.data.labels.length > 50) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d=>d.data.shift());
  }
  chart.update();
}

async function connectSerial() {
  if (!('serial' in navigator)) { alert('Web Serial not supported'); return; }
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    const decoder = new TextDecoderStream();
    port.readable.pipeTo(decoder.writable);
    const reader = decoder.readable.getReader();
    addEvent('Serial connected.');
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        const parts = value.trim().split(/,|\s+/).map(Number);
        if (parts.length >= 4) updateUI(parts[0], parts[1], parts[2], parts[3]);
      }
    }
  } catch (e) {
    console.error(e);
    addEvent('Serial connection failed.');
  }
}

function demoData() {
  setInterval(()=>{
    updateUI(6.5+Math.random()*2, 100+Math.random()*200, Math.random()*5, 0.5+Math.random());
  }, 1500);
  addEvent('Demo mode started.');
}

document.getElementById('btnSerial').addEventListener('click', connectSerial);
document.getElementById('btnDemo').addEventListener('click', demoData);
