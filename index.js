const express = require('express');
const app = express();
const path = require('path');

let reports = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/report', (req, res) => {
  const { lat, lng, desc, user, contact } = req.body;
  const timestamp = new Date().toISOString();
  reports.push({ lat, lng, desc, user, contact, timestamp, status: "🚨 Emergency Alert Sent" });
  console.log(`🚨 ALERT from ${user} at (${lat},${lng}). Contact: ${contact}`);
  res.json({ message: 'Reported' });
});

app.post('/help', (req, res) => {
  const { timestamp, user } = req.body;
  const r = reports.find(r => r.timestamp === timestamp);
  if (r) r.status = `✅ Help on the way by ${user}`;
  res.json({ message: 'Helped' });
});

app.get('/reports', (req, res) => res.json(reports));

app.listen(3000, () => console.log('HELPMAP running at http://localhost:3000'));
