# SyncVault React Frontend

A modern, responsive React frontend for SyncVault - your personal snippet manager that runs over your local network. Perfect for sharing code snippets, text, and links across your devices without needing to log into external services.

## Features

- 🔐 **Built-in Authentication** - Login and signup forms with JWT token management
- 📝 **Snippet Management** - Create, view, and delete snippets with rich formatting
- 🏷️ **Tagging System** - Organize snippets with custom tags
- 📱 **Device Management** - Select and manage multiple devices
- 🔍 **Smart Search** - Search snippets by content, tags, or device
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - WebSocket integration for live synchronization
- 📋 **Clipboard Integration** - Easy copy-paste functionality
- 🔒 **Local Network** - Secure, private snippet sharing on your network

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) or [Bun](https://bun.sh/)
- SyncVault backend server running (see [backend README](../syncvault-backend/README.md))
- Modern web browser with JavaScript enabled

## Quick Start

### 1. Clone and Install

```bash
# Navigate to the frontend directory
cd syncvault-react-frontend

# Install dependencies
npm install
# or with Bun
bun install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3000

# Optional: Custom port for development server
VITE_PORT=5173
```

### 3. Start Development Server

```bash
# Development mode with hot reload
npm run dev
# or with Bun
bun run dev
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Authentication

1. **First Time Setup**: Create an account using the signup form
2. **Login**: Use your email and password to authenticate
3. **Token Management**: JWT tokens are automatically stored and managed
4. **Session Persistence**: Stay logged in across browser sessions

### Device Management

1. **Device Selection**: Choose or create a device when first logging in
2. **Device Switching**: Change devices using the device selector
3. **Device Registration**: New devices are automatically registered with the backend

### Creating Snippets

1. Click the **"Paste New"** button in the header
2. Fill in the snippet details:
   - **Content**: Your text, code, or link
   - **Tags**: Comma-separated tags for organization
   - **Type**: Choose from text, code, or link
3. Click **"Create Snippet"** to save

### Managing Snippets

- **View**: All snippets are displayed in a clean, searchable list
- **Search**: Use the search bar to filter by content, tags, or device
- **Delete**: Click the delete button on any snippet to remove it
- **Copy**: Click to copy snippet content to clipboard

## API Integration

The frontend integrates with the SyncVault backend API:

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication

### Snippet Endpoints
- `GET /snippets` - Fetch user's snippets
- `POST /snippets` - Create new snippet
- `DELETE /snippets/:id` - Delete snippet

### Device Endpoints
- `GET /devices` - Fetch user's devices
- `POST /devices` - Register new device

All requests include automatic JWT authentication.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with navigation
│   ├── Login.tsx               # Login form component
│   ├── Signup.tsx              # Signup form component
│   ├── DeviceSelector.tsx      # Device selection interface
│   ├── SnippetList.tsx         # Main snippet listing
│   ├── SnippetItem.tsx         # Individual snippet display
│   └── CreateSnippetForm.tsx   # Snippet creation form
├── services/
│   ├── api.ts                  # API client with authentication
│   └── auth.ts                 # Authentication service
├── types/
│   ├── auth.ts                 # Authentication type definitions
│   ├── device.ts               # Device type definitions
│   └── snippet.ts              # Snippet type definitions
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```


### Development Workflow

1. **Setup**: Install dependencies and configure environment
2. **Development**: Use `npm run dev` for hot reload development
3. **Testing**: Test features in the browser
4. **Building**: Use `npm run build` for production builds
5. **Linting**: Run `npm run lint` to check code quality

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | ✅ | - |
| `VITE_PORT` | Development server port | ❌ | 5173 |

## Deployment

### Local Network Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Serve the build**:
   ```bash
   npm run preview
   ```

3. **Access from other devices**:
   - Use your computer's local IP address
   - Ensure the backend is also accessible on the network

### Production Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your web server
3. **Configure environment variables** for production
4. **Ensure backend is accessible** from the frontend domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the SyncVault ecosystem.

## Support

For issues and questions:
- Check the [backend documentation](../syncvault-backend/README.md)
- Review the [WebSocket documentation](../syncvault-backend/docs/websocket.md)
- Open an issue in the repository
