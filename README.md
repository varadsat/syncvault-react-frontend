# SyncVault React Frontend

A React-based personal snippet manager UI for the SyncVault backend.

## Features

- 🏠 **Home Page**: Display user's snippets with content preview, tags, device ID, and creation time
- 📝 **Create Snippet**: Form to create new snippets with content, tags, and optional device ID
- ❌ **Delete Snippet**: Delete individual snippets with confirmation
- 🔍 **Search & Filter**: Search snippets by content, tags, or device ID
- 🔐 **JWT Authentication**: Automatic JWT token handling from localStorage

## Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Configure environment**:
   Create a `.env.local` file with:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Set up authentication**:
   Store your JWT token in localStorage as `syncvault_token`:
   ```javascript
   localStorage.setItem('syncvault_token', 'your-jwt-token-here');
   ```

4. **Start the development server**:
   ```bash
   bun run dev
   ```

## Usage

### Authentication
The frontend expects a JWT token stored in localStorage as `syncvault_token`. All API requests automatically include this token in the Authorization header.

### Device ID
The app automatically generates and stores a device ID in localStorage. This is used when creating snippets and can be overridden in the create form.

### Creating Snippets
1. Click the "Paste New" button in the header
2. Fill in the content (required)
3. Add tags (comma-separated, optional)
4. Select snippet type (text, code, or link)
5. Optionally specify a device ID
6. Click "Create Snippet"

### Searching Snippets
Use the search bar to filter snippets by:
- Content text
- Tags
- Device ID

### Deleting Snippets
Click the "Delete" button on any snippet to remove it. The deletion is immediate and cannot be undone.

## API Integration

The frontend integrates with the SyncVault backend API:

- `GET /snippets` - Fetch user's snippets (filtered by JWT)
- `POST /snippets` - Create new snippet
- `DELETE /snippets/:id` - Delete snippet by ID

All requests include JWT authentication automatically.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with search and create button
│   ├── SnippetList.tsx     # List of snippets with search/filter
│   ├── SnippetItem.tsx     # Individual snippet display
│   └── CreateSnippetForm.tsx # Form for creating new snippets
├── services/
│   └── api.ts             # API client with JWT handling
├── types/
│   └── snippet.ts         # TypeScript type definitions
└── App.tsx                # Main application component
```

## Technologies Used

- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for HTTP requests
- Vite for build tooling
