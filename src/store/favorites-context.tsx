import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { saveFavoritesToDatabase } from '../api/users.api';
import { UserInputContext } from './user-input-context';

type FavoritesContext = {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContext>({
  favorites: [],
  addFavorite: (id: number) => {},
  removeFavorite: (id: number) => {},
});

type Props = {
  children: ReactNode;
};

const FavoritesContextProvider = ({ children }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(userInputCtx.userInput.favorites.items);
  }, [userInputCtx.userInput.favorites.items]);

  const addFavorite = async (id: number) => {
    // Update context
    setFavorites(currentFavorites => {
      const updatedFavorites = [...currentFavorites, id];
      saveFavoritesToDatabase(
        userInputCtx.userInput.id.value,
        updatedFavorites,
      );

      return updatedFavorites;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(currentFavorites => {
      const updatedFavorites = currentFavorites.filter(favoriteItem => {
        return favoriteItem !== id;
      });

      saveFavoritesToDatabase(
        userInputCtx.userInput.id.value,
        updatedFavorites,
      );

      return updatedFavorites;
    });
  };

  const value = {
    favorites: favorites,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
