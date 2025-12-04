# Rick and Morty Characters App

A React application built with TypeScript and TanStack Query that displays characters from the Rick and Morty API.

## 🚀 Features

- **Characters List Page**: Browse all Rick and Morty characters with infinite scrolling
- **Search Functionality**: Search characters by name with debounced input
- **Character Details Page**: View detailed information about each character including:
  - Character image
  - Basic information (species, gender, status, origin, location)
  - List of episodes where the character appeared
- **Responsive Design**: Works on all device sizes
- **Type-Safe**: Built with TypeScript for better developer experience

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Server state management and data fetching
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling

## 📁 Project Structure

```
src/
├── api/                      # API client and endpoints
│   └── rickAndMortyApi.ts   # Rick and Morty API functions
├── features/                 # Feature-based modules
│   ├── characters/          # Characters list feature
│   │   ├── components/      # Character-specific components
│   │   │   ├── CharacterCard.tsx
│   │   │   └── SearchBar.tsx
│   │   └── hooks/           # Custom hooks for characters
│   │       └── useCharacters.ts
│   └── character-details/   # Character details feature
│       ├── components/      # Detail page components
│       │   └── EpisodeList.tsx
│       └── hooks/           # Custom hooks for character details
│           └── useCharacter.ts
├── hooks/                    # Shared custom hooks
│   └── useDebounce.ts       # Debounce hook for search
├── pages/                    # Page components
│   ├── CharactersPage.tsx   # Main characters list page
│   └── CharacterDetailsPage.tsx  # Character detail page
├── routes/                   # Routing configuration
│   └── AppRoutes.tsx        # Application routes
├── types/                    # TypeScript type definitions
│   └── index.ts             # Shared types
├── App.tsx                   # Root component
└── main.tsx                  # Application entry point
```

## 🏗️ Architecture Highlights

### Feature-Based Structure
The project follows a feature-based architecture where each feature (characters, character-details) contains its own:
- Components
- Custom hooks
- Styles (CSS Modules)

### State Management
- **TanStack Query** for server state management
- Configured with optimal defaults (5-minute stale time, caching, retry logic)
- React Query DevTools enabled in development

### Custom Hooks
- `useCharacters`: Infinite query for character list with pagination
- `useCharacter`: Fetches character details and related episodes
- `useDebounce`: Debounces search input to reduce API calls

### Type Safety
- All API responses are typed
- Strict TypeScript configuration
- Type-safe component props

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rick-and-morty-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

This project uses the [Rick and Morty API](https://rickandmortyapi.com/documentation/).

### Endpoints Used:
- `GET /character` - Get all characters with optional filters
- `GET /character/:id` - Get a single character
- `GET /episode/:ids` - Get episodes by IDs

### API Features:
- Pagination support with infinite scrolling
- Search/filter by character name
- Error handling with Axios interceptors
- Optimized caching with TanStack Query

## 🎨 Key Implementation Details

### Infinite Scrolling
Uses TanStack Query's `useInfiniteQuery` for seamless pagination:
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['characters', filter],
  queryFn: ({ pageParam }) => getCharacters({ ...filter, page: pageParam }),
  getNextPageParam: (lastPage) => // extract next page
});
```

### Debounced Search
Implements custom `useDebounce` hook to prevent excessive API calls:
```typescript
const debouncedSearch = useDebounce(search, 500);
```

### Type Safety
Full TypeScript coverage with interfaces for all API responses:
```typescript
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  // ...
}
```

## 🧪 Code Quality

- **ESLint** configured with React and TypeScript rules
- **Type checking** with strict TypeScript settings
- **Modular CSS** with CSS Modules for scoped styles
- **Clean separation** of concerns (API, hooks, components, pages)

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The build output will be in the `dist` folder, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of a React + TypeScript bootcamp technical assessment.

---

Built with ❤️ using React, TypeScript, and TanStack Query
