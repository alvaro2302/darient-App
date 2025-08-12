import SearchViewModel from "@/app/ModelViewModels/SearchViewModel";
import { useJokeSearchStore } from "@/app/Store/JokeSearch";
import ListResultSearch from "@/components/ListResultSearch";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const Search = () => {
  const { searchJokeSpecific } = SearchViewModel();
  const { search, setSearch, resultSearch, loading } = useJokeSearchStore();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex:1}} >
        <View style={{marginHorizontal:'2%',paddingBottom:40}}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={async () => searchJokeSpecific(search)}
          />
        </View>
        <ListResultSearch listSearch={resultSearch?.result || []} loading={loading} />
      </View>
    </SafeAreaView>
  );
};
export default Search;
