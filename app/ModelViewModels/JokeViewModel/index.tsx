import { getJokeRandom } from "@/app/services/ServiceJoke";
import { useJokeStore } from "@/app/Store/Joke";
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
  return {
    getJoke,
  };
};
export default JokeViewModel;
