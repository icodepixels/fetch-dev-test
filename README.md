# Fetch Take Home Project
## Dog Finder App

A React application that helps users search and match with adoptable dogs from a shelter database.

## Features

- **User Authentication**: Secure login with name and email
- **Dog Search**:
  - Filter dogs by breed, age, and location
  - Sort results by breed or age
  - Paginated results for better performance
- **Favorites System**:
  - Add/remove dogs to favorites
  - Generate matches from favorited dogs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React 18
- TypeScript
- Material-UI
- Zustand (State Management)
- React Router
- Axios


## Getting Started

1. Clone the repository

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the production build locally

## Project Structure

```
/src
  /api           # API calls
  /pages         # Pages
  /store         # Store
  /types         # Types
  /components    # React components
  /assets        # Static assets (images, fonts, etc.)
  App.tsx       # Root component
  main.tsx      # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request