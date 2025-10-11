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

  const addFavorite = async (id: any) => {
    // Update context
    setFavorites((currentFavorites) => {
      const updatedFavorites = [...currentFavorites, id];
      saveFavoritesToDatabase(
        userInputCtx.userInput.id.value,
        updatedFavorites
      );

      return updatedFavorites;
    });
  };

  const removeFavorite = (id: any) => {
    console.log("Test 11:", id);
    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.filter((favoriteItem) => {
        return favoriteItem !== id;
      });

      saveFavoritesToDatabase(
        userInputCtx.userInput.id.value,
        updatedFavorites
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
