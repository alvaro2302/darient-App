import FavoriteViewModel from "@/app/ModelViewModels/FavoriteViewModel";
import { useAuthStore } from "@/app/Store/Auth";
import { useFavoriteStore } from "@/app/Store/Favorites";
import ListFavorites from "@/components/ListFavorites";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

const Favorites = () => {
  const {favorites, loading} = useFavoriteStore()
  const {user} = useAuthStore()
  const {getAllFavorites,removeAFavorite } = FavoriteViewModel();
  useEffect(()=>{
    if(user) {
      getAllFavorites(user)
    }
  },[])
  if (loading) {
    return  <ActivityIndicator size="large" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  }
  return (
    <>
    { user &&
      <ListFavorites favorites={favorites} user={user} deleteFavorite={removeAFavorite}/>
    }
    </>
  );
}
export default Favorites;