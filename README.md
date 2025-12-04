# Rick and Morty App

A React application that displays characters from the Rick and Morty API.

## Features

- Browse all characters with pagination
- Search characters by name
- View detailed character information
- See episodes for each character

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query** - Data fetching and caching
- **React Router** - Navigation
- **Vite** - Build tool
- **Axios** - HTTP client

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── api/                 # API client
├── features/            # Feature modules
│   ├── characters/      # Characters list
│   └── character-details/  # Character details
├── pages/               # Page components
├── routes/              # Routing config
├── types/               # TypeScript types
└── hooks/               # Custom hooks
```

## API

This app uses the [Rick and Morty API](https://rickandmortyapi.com/).

## License

Open source - Educational purposes.

