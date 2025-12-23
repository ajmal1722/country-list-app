import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import './App.css';
import { FavoritesProvider } from './context/favoritesContext';

function App() {

  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  )
}

export default App;