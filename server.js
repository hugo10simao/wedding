const express = require('express');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTemplate(template, values) {
  return template.replace(/{{(\w+)}}/g, (_, key) => values[key] ?? '');
}

app.get('/', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf8');
  const html = renderTemplate(template, {
    qrImage: '',
    landingUrl: '',
    background: '/background.svg',
    btn1Label: 'Cerimônia',
    btn1Url: 'https://www.google.com/maps/search/?api=1&query=igreja+casamento',
    btn2Label: 'Recepção',
    btn2Url: 'https://www.google.com/maps/search/?api=1&query=sal%C3%A3o+de+festas'
  });
  res.type('html').send(html);
});

app.post('/generate', async (req, res) => {
  const background = req.body.background || '/background.svg';
  const btn1Label = req.body.btn1Label || 'Button 1';
  const btn1Url = req.body.btn1Url || 'https://www.google.com/maps';
  const btn2Label = req.body.btn2Label || 'Button 2';
  const btn2Url = req.body.btn2Url || 'https://www.google.com/maps';

  const landingUrl = `${req.protocol}://${req.get('host')}/landing?background=${encodeURIComponent(background)}&btn1Label=${encodeURIComponent(btn1Label)}&btn1Url=${encodeURIComponent(btn1Url)}&btn2Label=${encodeURIComponent(btn2Label)}&btn2Url=${encodeURIComponent(btn2Url)}`;

  const qrImage = await qrcode.toDataURL(landingUrl, { margin: 1, width: 260 });
  const template = fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf8');
  const html = renderTemplate(template, {
    qrImage: `<img src="${qrImage}" alt="QR code" class="qr-image">`,
    landingUrl: `<p class="link-preview"><a href="${landingUrl}" target="_blank" rel="noreferrer">${escapeHtml(landingUrl)}</a></p>`,
    background: escapeHtml(background),
    btn1Label: escapeHtml(btn1Label),
    btn1Url: escapeHtml(btn1Url),
    btn2Label: escapeHtml(btn2Label),
    btn2Url: escapeHtml(btn2Url)
  });
  res.type('html').send(html);
});

app.get('/landing', (req, res) => {
  const background = req.query.background || '/background.svg';
  const btn1Label = req.query.btn1Label || 'Button 1';
  const btn1Url = req.query.btn1Url || 'https://www.google.com/maps';
  const btn2Label = req.query.btn2Label || 'Button 2';
  const btn2Url = req.query.btn2Url || 'https://www.google.com/maps';

  const template = fs.readFileSync(path.join(__dirname, 'views', 'landing.html'), 'utf8');
  const html = renderTemplate(template, {
    background: escapeHtml(background),
    btn1Label: escapeHtml(btn1Label),
    btn1Url: escapeHtml(btn1Url),
    btn2Label: escapeHtml(btn2Label),
    btn2Url: escapeHtml(btn2Url)
  });
  res.type('html').send(html);
});

app.listen(PORT, () => {
  console.log(`QR app ready at http://localhost:${PORT}`);
});
