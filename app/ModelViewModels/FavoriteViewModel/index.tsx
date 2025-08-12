import Favorite from "@/app/helper/Favorite";
import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import { deleteAFavorite, getFavorites } from "@/app/services/ServiceFavorite";
import { useFavoriteStore } from "@/app/Store/Favorites";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FAVORITES_KEY = 'favorites';
const FavoriteViewModel = () => {
  const { favorites, setFavorites, setLoading } = useFavoriteStore();
  const removeAFavorite = async (joke: Joke, user: UserLogged) => {
    setLoading(true);
    const isSuccessDeleteAFavorite = await deleteAFavorite(user, joke.id);
    if (isSuccessDeleteAFavorite) {
      const favoritesWithoutDeleted: Favorite[] = favorites.filter(
        (favorite: Favorite) => favorite.joke.id !== joke.id
      );
      setFavorites(favoritesWithoutDeleted);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesWithoutDeleted));
    }
    setLoading(false);
  };
  const getAllFavorites = async (user: UserLogged) => {
    try {
      setLoading(true);
      const favorites = await getFavorites(user);
      const allFavorites: Favorite[] = favorites.map((joke) => {
        return {
          joke,
          isFavorite: true,
        };
      });
      setFavorites(allFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites));
    } catch (error) {
      console.log("Error get all favorites", error);
      setLoading(false);
    }
  };
  const getFavoritesOffline = async () => {
    setLoading(true);
    try {
      const favoritesOffline = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesOffline) {
        const favoritesOfflineArray: Favorite[] = JSON.parse(favoritesOffline);
        setFavorites(favoritesOfflineArray);
      }
    } catch (error) {
      console.log("Error get favorites offline", error);
      setLoading(false);
    }
  };
  return {
    removeAFavorite,
    getAllFavorites,
    getFavoritesOffline,
  };
};
export default FavoriteViewModel;
