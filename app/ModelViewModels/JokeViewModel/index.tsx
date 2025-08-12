import { getJokeRandom, getJokeRandomDirect } from "@/app/services/ServiceJoke";
import { useJokeStore } from "@/app/Store/Joke";
import * as Notifications from 'expo-notifications';
const JokeViewModel = () => {
  const { setLoading, saveJoke } = useJokeStore();
  const getJoke = async (categoryJoke: string) => {
    try {
      setLoading(true);
      const joke = await getJokeRandom(categoryJoke);
      const jokeData = {
        id: joke.id,
        value: joke.value,
      };
      saveJoke(jokeData);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching joke:", error);
    }
  };
  const getJokeRandomWithNotification = async () => {
    try {
      const joke = await getJokeRandomDirect();
      Notifications.scheduleNotificationAsync({
        content: { title: 'Hi Chuck Say:', body: joke.value },
        trigger: { seconds: 2},
      });
    } catch (error) {
      console.error("Error fetching joke for notification:", error);
    }
  }
  return {
    getJoke,
    getJokeRandomWithNotification
  };
};
export default JokeViewModel;
