import SearchViewModel from "@/app/ModelViewModels/SearchViewModel";
import { useJokeSearchStore } from "@/app/Store/JokeSearch";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Card, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const Search = () => {
  const { searchJokeSpecific } = SearchViewModel();
  const { search, setSearch, resultSearch, loading } = useJokeSearchStore();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{width:'100%'}} >
        <View style={{marginHorizontal:'2%',paddingBottom:40}}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={async () => searchJokeSpecific(search)}
          />
        </View>
        {loading && (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}
        {resultSearch && !loading && (
          <FlatList
            data={resultSearch.result}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card style={{ alignSelf: "center", margin: 20, width: "90%" }}>
                <Card.Title title={"Chuck Norris Say:"} />

                <Card.Content>
                  <Text variant="titleMedium">{item.value}</Text>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Search;
