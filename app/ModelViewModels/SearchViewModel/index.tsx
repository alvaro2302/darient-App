import SearchJokeResponse from "@/app/helper/SearchJokeResponse";
import { searchJoke } from "@/app/services/ServiceJoke";
import { useJokeSearchStore } from "@/app/Store/JokeSearch";


const SearchViewModel = () => {
    const {setLoading,setResultSearch} = useJokeSearchStore();
    const searchJokeSpecific = async(search: string) => {
        setLoading(true)
        try {
        
            const response: SearchJokeResponse = await searchJoke(search);
            setResultSearch(response);
            setLoading(false)

        }
        catch(error) {
            console.log("error search joke",error);
            setLoading(false)
        }

    }
    return {
        searchJokeSpecific,
    }
}
export default SearchViewModel;