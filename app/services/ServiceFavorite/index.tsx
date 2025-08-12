import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import { supabase } from "@/lib/supabase";

export const addFavorite = async (
  joke: Joke,
  Userlogged: UserLogged
): Promise<boolean> => {
  let isSuccess = false;
  const { data, error } = await supabase
    .from("Favorites")
    .insert({
      idJoke: joke.id,
      idUser: Userlogged.id,
      JokeValue: joke.value,
    })
    .select()
    .single();
  if (error) {
    console.error("Error adding favorite joke:", error);
    return isSuccess;
  }
  if (data) {
    isSuccess = true;
  }
  return isSuccess;
};
export const getFavorites = async (userLogged: UserLogged): Promise<Joke[]> => {
  const { data, error } = await supabase
    .from("Favorites")
    .select("JokeValue, idJoke")
    .eq("idUser", userLogged.id);

  if (error) {
    console.error("Error fetching favorite jokes:", error);
    return [];
  }

  const favorites: Joke[] = data.map((item) => ({
    id: item.idJoke,
    value: item.JokeValue,
  }));
  return favorites;
};
export const deleteAFavorite = async (
  userLogged: UserLogged,
  id: string
): Promise<boolean> => {
  let isDeleteFavorite = true;
  const { data, error } = await supabase
    .from("Favorites")
    .delete()
    .eq("idUser", userLogged.id)
    .eq("idJoke", id);
  
  if (error) {
    console.log('error deleted', error)
    isDeleteFavorite = false;
  }

  return isDeleteFavorite;
};
