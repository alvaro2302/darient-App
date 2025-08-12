import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import { supabase } from "@/lib/supabase";

export const addFavorite = async (joke: Joke, Userlogged: UserLogged): Promise<boolean> => {
    let isSuccess = false;
    const {data, error} = await supabase.from('Favorites')
        .insert({
            idJoke: joke.id,
            idUser: Userlogged.id,
            JokeValue: joke.value,
        })
        .select()
        .single();
    if(error) {
        console.error("Error adding favorite joke:", error);
        return isSuccess;
    }
    if(data){
        isSuccess = true;
    }
    return isSuccess;
}