import JokeViewModel from "@/app/ModelViewModels/JokeViewModel";
import { addFavorite } from "@/app/services/ServiceFavorite";
import { useAuthStore } from "@/app/Store/Auth";
import { useJokeStore } from "@/app/Store/Joke";
import JokeComponent from "@/components/Joke";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
interface DetailsProps {
  route: { key: string; params: { category: string } };
  navigation: any;
}
const DetailsJoke = (props: DetailsProps) => {
  const { getJoke } = JokeViewModel();
  const { joke, loading } = useJokeStore();
  const { category } = props.route.params;
  const { user } = useAuthStore();
  useEffect(() => {
    getJoke(category);
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }
  return (
    <View>
      {joke && user && (
        <JokeComponent joke={joke} user={user} addFavorite={addFavorite} />
      )}
    </View>
  );
};
export default DetailsJoke;
