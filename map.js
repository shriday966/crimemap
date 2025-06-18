const map = L.map('map').setView([22.9734, 78.6569], 5); // Center on India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
}).addTo(map);

fetch('crimes.json')
  .then(res => res.json())
  .then(data => {
    const statusColor = {
      registered: 'yellow',
      arrested: 'orange',
      chargesheeted: 'blue',
      convicted: 'green',
      acquitted: 'red'
    };

    data.forEach(crime => {
      const color = statusColor[crime.status] || 'black';

      const marker = L.circleMarker([crime.latitude, crime.longitude], {
        radius: 7,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        <strong>${crime.title}</strong><br/>
        Status: <b>${crime.status}</b><br/>
        ${crime.description}
      `);
    });
  });
