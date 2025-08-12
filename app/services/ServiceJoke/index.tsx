import jokeRandomResponse from "@/app/helper/JokeRandomResponse";
import SearchJokeResponse from "@/app/helper/SearchJokeResponse";

const URL = 'https://api.chucknorris.io/jokes/'
export const getJokeRandom = async (category: string): Promise<jokeRandomResponse> => {
  const response = await fetch(`${URL}random?category=${category}`).then((response) => {
    if (!response.ok) {
      throw new Error('Network Error response get Joke Random');
    }
    return response.json();
  });
  return response;
}
export const searchJoke = async (search: string): Promise <SearchJokeResponse> => {
    const response = await fetch(`${URL}search?query=${search}`).then((response) => {
      if (!response.ok) {
      throw new Error('Network Error response search joke');
    }
    return response.json();
    });
    return response;

}
export const getJokeRandomDirect = async (): Promise<jokeRandomResponse> => {
  const response = await fetch(`${URL}random`).then((response) => {
    if (!response.ok) {
      throw new Error('Network Error response get Joke Random');
    }
    return response.json();
  });
  return response;
}

