import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { UserInputContext } from "./user-input-context";
import { saveFavoritesToDatabase } from "../api/users.api";

export const FavoritesContext: any = createContext({
  favorites: [],
  addFavorite: (id: any) => {},
  removeFavorite: (id: any) => {},
});

type Props = {
  children: ReactNode;
};

const FavoritesContextProvider = ({ children }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [favorites, setFavorites] = useState<Number[]>([]);

  useEffect(() => {
    setFavorites(userInputCtx.userInput.favorites.items);
  }, [userInputCtx.userInput.favorites.items]);

  console.log("Test 40", favorites);
  const addFavorite = (id: any) => {
    // Update context
    setFavorites((currentFavorites) => {
      return [...currentFavorites, id];
    });

    // Update databases
    saveFavoritesToDatabase(userInputCtx.userInput.id.value, id);
  };
  const removeFavorite = (id: any) => {
    setFavorites((currentFavorites) => {
      return currentFavorites.filter((favoriteItem) => {
        return favoriteItem !== id;
      });
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
