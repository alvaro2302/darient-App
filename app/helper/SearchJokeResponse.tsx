import jokeRandomResponse from "./JokeRandomResponse";

interface SearchJokeResponse {
    total: number;
    result: jokeRandomResponse[];
}
export default SearchJokeResponse;