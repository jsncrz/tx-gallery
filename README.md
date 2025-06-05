# WIP: VT Gallery

[![Angular](https://img.shields.io/badge/Angular-16-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A modern web application for viewing Twitter images through an intuitive gallery interface, powered by the VT Gallery API backend.

## Features

- **Character Management**: Add and organize characters with their associated Twitter tags
- **Image Gallery**: Browse images associated with characters using tags or character filters
- **Manual Sync**: Manually synchronize images from Twitter feeds for real-time updates
- **Responsive Design**: Optimized viewing experience across desktop and mobile devices
- **Tag-based Navigation**: Efficient filtering and searching through image collections

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jsncrz/tx-gallery.git
cd vt-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:4200`

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start development server with hot reload |
| `yarn build` | Build the app for production |
| `yarn test` | Run unit tests |

## Tech Stack

- **Frontend Framework**: Angular 16
- **Language**: TypeScript
- **Package Manager**: NPM
- **Styling**: TaigaUI
- **API Integration**: VT Gallery API Backend

##  Screenshots

![alt text](https://i.ibb.co/qM9gmLXb/vt2c.png "Gallery view")


##  Usage

### Viewing Images
- **By Character**: Select a character to view all associated images
- **By Tag**: Use tag filters to browse specific image collections
- **Search**: Use the search functionality to find specific content

### Manual Sync
Click the sync button to manually update the image collection from Twitter feeds.

## Configuration

Update the `nx.json` file in the root directory:

```json
{
    ...
        "accessToken": "" // Update this
    ...
}
```


## API Documentation

This frontend connects to the VT Gallery API backend. For API documentation, please refer to the [backend repository](https://github.com/jsncrz/tx-gallery-api).
