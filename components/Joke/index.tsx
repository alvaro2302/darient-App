import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import { Card, Text } from "react-native-paper";
import FavoriteHeart from "../FavoriteHeart";

interface JokeProps {
  joke: Joke;
  user: UserLogged;
  addFavorite: (joke: Joke, userLogged: UserLogged) => Promise<boolean>;
}

const JokeComponent = (props: JokeProps) => {
    const { joke, user, addFavorite } = props;
    return (
       <Card style={{alignSelf: 'center', margin: 20, width: '90%'}}> 
          <Card.Title title={'Chuck Norris Say:'} right={(props) => <FavoriteHeart joke={joke} userLogged={user} addFavorite={addFavorite}/>}
          
          />
          
          <Card.Content>
            <Text variant='titleMedium'>{joke.value}</Text>
          </Card.Content>
          
        </Card>
    );
}
export default JokeComponent;