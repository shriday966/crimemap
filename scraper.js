const fs = require('fs');
const axios = require('axios');

// For now: scrapes crime headlines from Inshorts
const SCRAPE_SOURCE = 'https://inshortsapi.vercel.app/news?category=crime';

const locations = [
  { city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { city: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { city: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { city: 'Bhopal', lat: 23.2599, lon: 77.4126 },
  { city: 'Kolkata', lat: 22.5726, lon: 88.3639 }
];

function getRandomStatus() {
  const status = ['registered', 'arrested', 'chargesheeted', 'convicted', 'acquitted'];
  return status[Math.floor(Math.random() * status.length)];
}

async function run() {
  try {
    const res = await axios.get(SCRAPE_SOURCE);
    const news = res.data.data;

    const crimes = news.slice(0, 10).map((item, i) => {
      const loc = locations[i % locations.length];
      return {
        title: item.title,
        description: item.content,
        latitude: loc.lat,
        longitude: loc.lon,
        status: getRandomStatus()
      };
    });

    fs.writeFileSync('crimes.json', JSON.stringify(crimes, null, 2));
    console.log('✅ crimes.json updated successfully!');
  } catch (err) {
    console.error('❌ Failed to scrape:', err.message);
  }
}

run();
