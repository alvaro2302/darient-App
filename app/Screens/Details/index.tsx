import JokeViewModel from "@/app/ModelViewModels/JokeViewModel";
import { addFavorite } from "@/app/services/ServiceFavorite";
import { useAuthStore } from "@/app/Store/Auth";
import { useJokeStore } from "@/app/Store/Joke";
import FavoriteHeart from "@/components/FavoriteHeart";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
interface DetailsProps {
  route: { key: string; params: { category: string } };
  navigation: any;
}
const DetailsJoke = (props: DetailsProps) => {
  const { getJoke} = JokeViewModel();
  const {joke,loading} = useJokeStore()
  const { category } = props.route.params;
  const {user} = useAuthStore();
  useEffect(() => {
    getJoke(category);
  },[]);

  if(loading) {
    return <ActivityIndicator size="large" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  }
  return (
    <View>
      { joke && user &&(
        <Card style={{alignSelf: 'center', margin: 20, width: '90%'}}> 
          <Card.Title title={'Chuck Norris Say:'} right={(props) => <FavoriteHeart joke={joke} userLogged={user} addFavorite={addFavorite}/>}
          
          />
          
          <Card.Content>
            <Text variant='titleMedium'>{joke.value}</Text>
          </Card.Content>
          
        </Card>)
    }
    </View>
  );
}
export default DetailsJoke;