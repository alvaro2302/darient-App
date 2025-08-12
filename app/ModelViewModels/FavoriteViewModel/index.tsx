import Favorite from "@/app/helper/Favorite"
import Joke from "@/app/helper/Joke"
import UserLogged from "@/app/helper/UserLogged"
import { deleteAFavorite, getFavorites } from "@/app/services/ServiceFavorite"
import { useFavoriteStore } from "@/app/Store/Favorites"

const FavoriteViewModel = () => {
    const {favorites, setFavorites ,setLoading} = useFavoriteStore(); 
    const removeAFavorite = async (joke: Joke, user: UserLogged ) => {
        setLoading(true)
        const isSuccessDeleteAFavorite = await deleteAFavorite(user,joke.id);
        if( isSuccessDeleteAFavorite) {
            const favoritesWithoutDeleted: Favorite[] = favorites.filter((favorite: Favorite)=> favorite.joke.id !== joke.id);
            setFavorites(favoritesWithoutDeleted);
        }
        setLoading(false);
    }
    const getAllFavorites  = async (user: UserLogged) => {
        try {
        setLoading(true)
        const favorites = await getFavorites(user);
        const allFavorites: Favorite[] = favorites.map((joke)=>{
            return {
                joke,
                isFavorite: true,
            }
        })
        setFavorites(allFavorites);
        } catch(error) {
            console.log('Error get all favorites', error)
            setLoading(false)
        }
    }
    return {
        removeAFavorite,
        getAllFavorites
    }
    
}
export default FavoriteViewModel;