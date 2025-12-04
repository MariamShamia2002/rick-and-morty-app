# Contributing Guide

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173

## Code Style Guidelines

### TypeScript
- Use strict TypeScript mode
- Avoid `any` types
- Define interfaces for all props
- Use type inference where possible

### React Components
```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  onClick: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};

// ❌ Avoid
const Component = (props: any) => { }
```

### Custom Hooks
```typescript
// ✅ Good - Prefix with 'use'
export const useCharacter = (id: number) => {
  const query = useQuery({...});
  return query;
};

// ✅ Good - Return consistent structure
return {
  data: query.data,
  isLoading: query.isLoading,
  error: query.error
};
```

### File Organization
```
feature-name/
├── components/
│   ├── Component.tsx
│   └── Component.module.css
└── hooks/
    └── useFeature.ts
```

### Naming Conventions
- **Components**: PascalCase (e.g., `CharacterCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useCharacter.ts`)
- **CSS Modules**: Match component name (e.g., `CharacterCard.module.css`)
- **Types**: PascalCase (e.g., `Character`, `Episode`)

## TanStack Query Patterns

### Query Keys
Use descriptive, hierarchical keys:
```typescript
['characters']                    // All characters
['characters', { name: 'Rick' }]  // Filtered characters
['character', id]                 // Single character
['episodes', [1, 2, 3]]          // Multiple episodes
```

### Query Configuration
```typescript
useQuery({
  queryKey: ['resource', params],
  queryFn: () => fetchResource(params),
  staleTime: 1000 * 60 * 5,      // 5 minutes
  enabled: !!params,              // Only run if params exist
})
```

## Component Patterns

### Loading States
```typescript
if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage error={error} />;
return <Content data={data} />;
```

### Event Handlers
```typescript
// Prefix with 'handle'
const handleClick = () => { };
const handleSubmit = (e: FormEvent) => { };
const handleChange = (value: string) => { };
```

### Props Destructuring
```typescript
// ✅ Good
const Component: React.FC<Props> = ({ title, description }) => {
  return <div>{title}</div>;
};

// ❌ Avoid
const Component: React.FC<Props> = (props) => {
  return <div>{props.title}</div>;
};
```

## API Integration

### Adding New Endpoints
1. Add types to `src/types/index.ts`
2. Add API function to `src/api/rickAndMortyApi.ts`
3. Add JSDoc comments
4. Export function

Example:
```typescript
/**
 * Fetches locations from the API
 * @param params - Optional filter parameters
 * @returns Promise with location data
 */
export const getLocations = async (params?: LocationFilter) => {
  const response = await apiClient.get('/location', { params });
  return response.data;
};
```

### Error Handling
```typescript
try {
  const data = await apiCall();
  return data;
} catch (error) {
  console.error('API Error:', error);
  throw error; // Let TanStack Query handle it
}
```

## CSS Modules

### Naming
- Use camelCase for class names
- Be descriptive but concise

```css
/* ✅ Good */
.container { }
.primaryButton { }
.errorMessage { }

/* ❌ Avoid */
.div1 { }
.button { }
.red { }
```

### Organization
```css
/* Layout */
.container { }

/* Content */
.title { }
.description { }

/* Interactive */
.button { }
.link { }

/* States */
.isActive { }
.isDisabled { }
```

## Testing (Future)

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';

test('renders character name', () => {
  const character = { id: 1, name: 'Rick' };
  render(<CharacterCard character={character} onClick={jest.fn()} />);
  expect(screen.getByText('Rick')).toBeInTheDocument();
});
```

### Hook Tests
```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce';

test('debounces value', async () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: 'test' } }
  );
  // Test implementation
});
```

## Git Workflow

### Commit Messages
Use conventional commits:
```
feat: add character filtering
fix: resolve search debounce issue
docs: update README
refactor: extract custom hook
style: format code
```

### Branch Naming
```
feature/character-filters
fix/search-bug
docs/api-documentation
refactor/hooks-structure
```

## Pull Request Guidelines

### Before Submitting
- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Components are properly typed
- [ ] Code follows style guide
- [ ] New features documented

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation

## Testing
How to test the changes

## Screenshots (if applicable)
```

## Performance Guidelines

### Avoid Unnecessary Re-renders
```typescript
// ✅ Use callbacks for event handlers
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ✅ Memoize expensive computations
const filtered = useMemo(() => {
  return items.filter(filterFn);
}, [items]);
```

### Optimize Images
- Use appropriate image sizes
- Consider lazy loading
- Use modern formats (WebP)

### Query Optimization
- Set appropriate stale times
- Use query keys properly
- Enable/disable queries conditionally

## Accessibility

### Required Practices
- Use semantic HTML
- Add ARIA labels where needed
- Support keyboard navigation
- Provide alt text for images
- Maintain focus management

```typescript
// ✅ Good
<button aria-label="Close dialog" onClick={handleClose}>
  ×
</button>

<img src={character.image} alt={character.name} />

// Support keyboard
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};
```

## Documentation

### Code Comments
```typescript
// ✅ Explain WHY, not WHAT
// Debounce to prevent excessive API calls during typing
const debouncedSearch = useDebounce(search, 500);

// ✅ Document complex logic
/**
 * Extracts episode IDs from API URLs
 * The API returns full URLs, but we only need the IDs
 */
export const getEpisodeIdsFromUrls = (urls: string[]) => { }
```

### Component Documentation
Add JSDoc for complex components:
```typescript
/**
 * Displays a character card with image and basic info
 * 
 * @component
 * @example
 * <CharacterCard 
 *   character={character} 
 *   onClick={(id) => navigate(`/character/${id}`)} 
 * />
 */
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)

## Questions?

If you have questions about contributing:
1. Check existing documentation
2. Look at similar implementations in the codebase
3. Open a discussion issue

Happy coding! 🚀
