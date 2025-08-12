import jokeRandomResponse from "@/app/helper/JokeRandomResponse";

const URL = 'https://api.chucknorris.io/jokes/random'
const getJokeRandom = async (category: string): Promise<jokeRandomResponse> => {
  const response = await fetch(`${URL}?category=${category}`).then((response) => {
    if (!response.ok) {
      throw new Error('Network Error response get Joke Random');
    }
    return response.json();
  });
  return response;
}
export default getJokeRandom;