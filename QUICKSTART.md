# Quick Start Guide 🚀

## Prerequisites
- Node.js 18 or higher installed
- Git installed

## Run the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at **http://localhost:5173**

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## What You'll See

### Home Page (Characters List)
- Browse Rick and Morty characters
- Search by name in the search bar
- Click "Load More" for more characters
- Click any character card to view details

### Character Details Page
- See character image and information
- View all episodes the character appeared in
- Click back button to return to list

## Features to Try

1. **Search**: Type "Rick" in the search bar
2. **Navigation**: Click on any character
3. **Episodes**: Scroll through episode list
4. **Back Button**: Return to characters list
5. **Load More**: Get more characters

## Development Tools

### React Query DevTools
- Floating icon in bottom-right corner (dev mode only)
- Click to open and inspect queries
- See cache status and query states

### Hot Module Replacement
- Make changes to code
- See updates instantly without page reload

## Project Structure

```
src/
├── pages/              # Main pages
├── features/           # Feature modules
├── components/         # Shared components
├── hooks/              # Custom hooks
├── api/                # API integration
└── types/              # TypeScript types
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or change port in vite.config.ts
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Run linter
npm run lint
```

## Learn More

- Read `README_APP.md` for detailed documentation
- Check `ARCHITECTURE.md` for code architecture
- See `CONTRIBUTING.md` for development guidelines
- Review `PROJECT_CHECKLIST.md` for features

## Support

For issues or questions:
1. Check the documentation files
2. Verify all dependencies are installed
3. Ensure Node.js version is 18+

---

Happy coding! 🎉
