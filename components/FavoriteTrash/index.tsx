import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper";
interface FavoriteHeartProps {
  joke: Joke;
  userLogged: UserLogged;
  deleteFavorite?: (joke: Joke, user: UserLogged) => Promise<void>;
}

const FavoriteTrash = (props: FavoriteHeartProps) => {
  
  const [loading, setLoading] = useState(false);
  const { joke, userLogged, deleteFavorite } = props;
  const toggleFavorite = async () => {
    setLoading(true);
    await deleteFavorite?.(joke, userLogged);
    setLoading(false);
  };
  if(loading) {
    return <ActivityIndicator size='small' style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  }
  return (
    <>
    <Pressable onPress={toggleFavorite}>
      <Ionicons size={40} name={'trash'} color={'red'} />
    </Pressable>
    </>
  )
}
export default FavoriteTrash;