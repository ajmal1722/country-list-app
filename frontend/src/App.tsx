import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import './App.css';
import { FavoritesProvider } from './context/favoritesContext';
import { ThemeProvider } from './context/themeContext';

function App() {

  return (
    <FavoritesProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </FavoritesProvider>
  )
}

export default App;