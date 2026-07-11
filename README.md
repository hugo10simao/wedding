# QR Code Wedding Generator

A web app that generates QR codes linking to a customizable landing page with background images and Google Maps buttons.

## Features

- **QR Code Generator**: Create scannable QR codes for your events
- **Customizable Landing Page**: Personalize button labels and Google Maps locations
- **Background Images**: Support for custom background images (URL or local)
- **Two-Button Layout**: Perfect for directing guests to multiple locations

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd qrcode_wedding
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Usage

1. **Generator Page** (http://localhost:3000):
   - Enter a background image URL
   - Set labels for your two buttons
   - Provide Google Maps URLs for each location
   - Click "Generate QR code"

2. **Landing Page**:
   - Scanned QR codes direct users to the landing page
   - Users see your custom background and two clickable buttons
   - Buttons open Google Maps with your specified locations

### Example Google Maps URLs

Replace these with your actual event locations:

- `https://www.google.com/maps/search/?api=1&query=church+address`
- `https://www.google.com/maps/search/?api=1&query=reception+venue+address`

## File Structure

```
qrcode_wedding/
├── server.js              # Express server
├── package.json           # Dependencies
├── public/
│   ├── styles.css         # Styling
│   └── background.svg     # Default background image
├── views/
│   ├── index.html         # Generator page
│   └── landing.html       # Landing page template
└── README.md              # This file
```

## Technologies

- **Express.js** - Web server
- **qrcode** - QR code generation
- **HTML/CSS** - Frontend

## License

MIT
