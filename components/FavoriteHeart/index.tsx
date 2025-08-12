import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import { useState } from "react";
import { Pressable } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";

interface FavoriteHeartProps {
  joke: Joke;
  userLogged: UserLogged;
  addFavorite?: (joke: Joke, user: UserLogged) => Promise<boolean>;
}

const FavoriteHeart = (props: FavoriteHeartProps) => {
  
  const [color, setColor] = useState('gray');
  const [loading, setLoading] = useState(false);
  const { joke, userLogged, addFavorite } = props;
  const toggleFavorite = async () => {
    setLoading(true);
    const isAddFavorite = await addFavorite?.(joke, userLogged);
    setColor(isAddFavorite ? 'red' : 'gray');
    setLoading(false);
  };
  if(loading) {
    return <ActivityIndicator size='small' style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  }
  return (
    <>
    <Pressable onPress={toggleFavorite}>
      <Icon size={50} source={'heart'} color={color} />
    </Pressable>
    </>
  )
}
export default FavoriteHeart;