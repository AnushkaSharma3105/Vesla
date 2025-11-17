function demoInsights() {
  const ctx24 = document.getElementById('chart24h').getContext('2d');
  new Chart(ctx24, {
    type: 'line',
    data: { labels: Array.from({length:24}, (_,i)=>i+':00'), datasets: [
      { label: 'pH', data: Array.from({length:24}, ()=>6.5+Math.random()*2), borderColor:'cyan' },
      { label: 'TDS', data: Array.from({length:24}, ()=>100+Math.random()*200), borderColor:'lime' }
    ]}
  });
  const ctx7 = document.getElementById('chart7d').getContext('2d');
  new Chart(ctx7, {
    type: 'bar',
    data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [
      { label: 'Colony Grade', data: Array.from({length:7}, ()=>70+Math.random()*30), backgroundColor:'lime' }
    ]}
  });
}
